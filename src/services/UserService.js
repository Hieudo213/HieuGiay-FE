import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`http://localhost:3000/api/v1/auth/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(
    `http://localhost:8080/api/v1/auth/register`,
    data
  );
  return res.data;
};

export const getUserByEmail = async (email, accessToken) => {
  const res = await axiosJWT.get(`http://localhost:8080/api/v1/user/${email}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/auth/refresh', 
      {
        withCredentials: true
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; 
  }
};

export const logout = async () => {
  const res = await axios.post(`http://localhost:3000/api/v1/auth/logout`);
  return res.data;
};

export const updateUserByEmail = async (email, data, accessToken) => {
  console.log(data);
  const res = await axiosJWT.put(
    `http://localhost:8080/api/v1/user/update/${email}`,
    data,
    // {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "Content-Type": "application/json",
    //   },
    // }
  );
  return res.data;
};

export const updateImageUserByEmail = async (email, imageFile, accessToken) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  const res = await axios.put(
    `http://localhost:8080/api/v1/user/image/${email}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const deleteUserByEmail = async (email) => {
  try {
    const res = axios.delete(`http://localhost:8080/api/v1/user/delete/${email}`)
    window.location.reload();
    return res.data;
  } catch (error) {
    throw error;
  }
}
