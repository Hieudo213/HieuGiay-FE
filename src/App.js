import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index.js";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent.jsx";
import { isJsonString } from "./ultils.js";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "./services/UserService.js";

import { updateUser } from "./redux/slice/userSlice.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent.jsx";
export function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.sub) {
      handleGetUserByEmail(decoded?.sub, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("access_token", JSON.stringify(data?.accessToken));
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetUserByEmail = async (email, accessToken) => {
    const res = await UserService.getUserByEmail(email, accessToken);
    const payload = {
      ...res,
      accessToken: accessToken,
    };
    dispatch(updateUser(payload));
    setIsLoading(false);
  };
  return (
    <div>
      <LoadingComponent isLoading={isLoading} >
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page;
              const isCheckAuth = !route?.isPrivate || user?.role === "ADMIN";
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={index}
                  path={isCheckAuth ? route.path : undefined}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </LoadingComponent>
    </div>
  );
}
export default App;
