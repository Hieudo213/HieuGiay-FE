import AdminPage from "../AdminPage/AdminPage";
import HomePage from "../pages/HomePages/HomePage";
import NotfoundPage from "../pages/NotfoundPage/NotFoundPage";
import OrderList from "../pages/OrderPages/OrderList";
import OrderPage from "../pages/OrderPages/OrderPage";
import Payment from "../pages/PaymentPage/Payment";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPages/ProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SearchPage from "../pages/SearchPages/SearchPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeBrand from "../pages/TypeProductPage/TypeBrand";
import TypeCategory from "../pages/TypeProductPage/TypeCategory";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader : true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader : true
    },
    {
        path: '/order-history',
        page: OrderList,
        isShowHeader : true,
        
    }, 
    {
        path: '/payment',
        page: Payment,
        isShowHeader : true 
    },
    {
        path: '/type/brand/:id',
        page: TypeBrand,
        isShowHeader : true
    },
    {
        path: '/type/category/:id',
        page: TypeCategory,
        isShowHeader : true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader : false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader : false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader : true
    },
    {
        path: '/search',
        page: SearchPage,
        isShowHeader : true
    },
    {
        path : '/profile-user',
        page : ProfilePage,
        isShowHeader : true
    },
    {
        path : '/system/admin',
        page : AdminPage,
        isShowHeader : false,
        isPrivate: true
    },
    {
        path: '/*',
        page: NotfoundPage
    }
]

