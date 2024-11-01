import config from '../config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import DashboardPage from '../pages/Vendor/DashboardPage/DashboardPage';
import AddProducts from '../pages/Vendor/ProductPage/AddProducts';
import ListProducts from '../pages/Vendor/ProductPage/Listproducts';
import AddCategory from '../pages/Vendor/CategoryPage/AddCategory';
import ListCategory from '../pages/Vendor/CategoryPage/ListCategory';
import AddCustomer from '../pages/Vendor/CustomerPage/AddCustomer';
import ListCustomer from '../pages/Vendor/CustomerPage/ListCustomer';
import ListAccount from '../pages/Admin/AccountPage/ListAccount';
import Login from '../pages/Vendor/LoginPage/LoginPage';
import EditCategory from '../pages/Vendor/CategoryPage/EditCategory';
import AddSupplier from '../pages/Vendor/SupplierPage/AddSupplier';
import ListSupplier from '../pages/Vendor/SupplierPage/ListSupplier';
import EditSupplier from '../pages/Vendor/SupplierPage/EditSupplier';
import ListTag from '../pages/Vendor/PostPage/Tag';
import EditCustomer from '../pages/Vendor/CustomerPage/EditCustomer';
import ForbiddenPage from '../pages/Vendor/ErrorPage/ForbiddenPage';
import ListPageOrder from '../pages/Vendor/PageOrder/ListPage';
import ListBilPage from '../pages/Vendor/BillPage/ListBilPage';
import AddPost from '../pages/Vendor/PostPage/AddPost';
import EditProducts from '../pages/Vendor/ProductPage/EditProducts';
import ListComment from '../pages/Vendor/ProductPage/ListComment';
import InvoiceConfirmation from '../pages/Vendor/PageOrder/InvoiceConfirmation';
import Pagecalendar from '../pages/Vendor/Pagecalendar/calendar';
import ListPost from '../pages/Vendor/PostPage/ListPost';

// Public routes
const publicRoutes = [
    { path: config.routes.Login, component: Login, layout: null },
    { path: config.routes.Forbidden, component: ForbiddenPage, layout: null },
 
   
];


const privateRoutes = [
    { path: config.routes.Dashboard, component: DashboardPage },
    { path: config.routes.AddProduct, component: AddProducts },
    { path: config.routes.ListProduct, component: ListProducts },
    { path: config.routes.EditProduct,component:EditProducts},
    { path: config.routes.ListComment, component: ListComment },
    { path: config.routes.AddCatrgory, component: AddCategory },
    { path: config.routes.EditCatrgory, component: EditCategory },
    { path: config.routes.ListCategory, component: ListCategory },

    { path: config.routes.AddCustomer, component: AddCustomer },
    { path: config.routes.EditCustomer, component: EditCustomer },
    { path: config.routes.ListCustomer, component: ListCustomer },

    { path: config.routes.ListAccount, component: ListAccount },


    { path: config.routes.AddSupplier, component: AddSupplier },
    { path: config.routes.ListSupplier, component: ListSupplier },
    { path: config.routes.EditSupplier, component: EditSupplier },
    
    { path: config.routes.TagPost,component: ListTag},
    { path: config.routes.AddPost,component: AddPost},
    { path: config.routes.ListPost,component: ListPost},


    {path:config.routes.ListOrder,component: ListPageOrder},
    { path: config.routes.InvoiceConfirmation, component: InvoiceConfirmation },


    {path:config.routes.Bill,component: ListBilPage},

    {path:config.routes.calendar,component: Pagecalendar},


];

export { publicRoutes, privateRoutes };