const routes = {
    home: '/',
    products_list:'/products/products-listing',
    Login:'/account/login',
    Verify:'/account/verify',
    Information:'/account/information',
    Register:'/account/register',
    Cart:'/products/cart',
    Post:'/blogs/news',
    Post_details:'/blogs/details/:postId',
    Contact:'/contact',
    Checkout:'/checkouts',
    GetProduct:'/products/details/:productId',
    Profile: '/profile',
    AboutUs: '/aboutUs',
    CompleteOrder: '/complete-order/:orderId',
    PaymentSuccessful: '/payment-successful/:orderId'


};
export default routes;