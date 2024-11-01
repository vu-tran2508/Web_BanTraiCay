import config from '../config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '../pages/Customer/HomePage/Home';
import Products_Listing from '../pages/Customer/Products-Listing/products-listing';
import Login from '../pages/Customer/LoginPage/Login';
import Register from '../pages/Customer/RegisterPage/Register';
import CartPage from '../pages/Customer/CartPage/CartPage';
import Post from '../pages/Customer/PostPage/PostPage';
import PostDetail from '../pages/Customer/PostPage/PostDetail';
import ContactPage from '../pages/Customer/ContactPage/ContactPage';
import CheckoutPage from '../pages/Customer/CheckoutPage/CheckoutPage';
import ProductDetail from '../pages/Customer/ProductDetailPage/ProductDetai';
import UserProfile from '../pages/Customer/ProfilePage/UserProfile';
import CompleteOrder from '../components/Order/complete-order';
import PaymentSuccess from '../components/Order/Payment-Success';
import Verify from '../pages/Customer/RegisterPage/Verify';
import Information from '../pages/Customer/RegisterPage/Information';
import AboutUs from '../pages/Customer/AboutUsPage/AboutUsPage';


// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.products_list, component: Products_Listing },
    { path: config.routes.Login,component:Login},
    { path: config.routes.Verify,component:Verify},
    { path: config.routes.Register,component:Register},
    { path: config.routes.Verify,component:Verify},
    { path: config.routes.Information,component:Information},
    { path: config.routes.Post,component:Post},
    { path: config.routes.Post_details,component:PostDetail},
    { path: config.routes.Contact,component:ContactPage},
    { path: config.routes.Cart,component:CartPage},
    { path: config.routes.Checkout,component:CheckoutPage ,layout: null},
    { path: config.routes.GetProduct,component:ProductDetail},
    { path: config.routes.Profile,component:UserProfile},
    { path: config.routes.CompleteOrder,component:CompleteOrder},
    { path: config.routes.PaymentSuccessful,component:PaymentSuccess},
    { path: config.routes.AboutUs,component:AboutUs}


];

const privateRoutes = [];

export { publicRoutes, privateRoutes };