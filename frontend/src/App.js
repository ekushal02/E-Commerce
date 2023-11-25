import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import React, { useEffect} from 'react';
import WebFont from "webfontloader"
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
// import axios from 'axios';
import Payment from './component/Cart/Payment';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from './component/layout/Not Found/NotFound';
// import ProtectedRoute from './component/Route/ProtectedRoute';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const isAdmin = true;
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  },[]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/process/payment" element={<Payment />} />
        <Route exact path="/account" element={isAuthenticated ? <Profile /> : <LoginSignUp/>} />
        <Route exact path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp/>} />
        <Route exact path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp/>} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/shipping" element={isAuthenticated ? <Shipping /> : <LoginSignUp/>} />
        <Route exact path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp/>} />

        <Route exact path="/success" element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp/>} />
        <Route exact path="/orders" element={isAuthenticated ? <MyOrders /> : <LoginSignUp/>} />
        <Route exact path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <LoginSignUp/>} />

        <Route exact path="/admin/dashboard" element={isAuthenticated && (isAdmin&&user.role==="admin")? <Dashboard /> : <LoginSignUp/>} />
        <Route exact path="/admin/products" element={isAuthenticated && (isAdmin&&user.role==="admin")? <ProductList /> : <LoginSignUp/>} />
        <Route exact path="/admin/product" element={isAuthenticated && (isAdmin&&user.role==="admin")? <NewProduct /> : <LoginSignUp/>} />
        <Route exact path="/admin/product/:id" element={isAuthenticated && (isAdmin&&user.role==="admin")? <UpdateProduct /> : <LoginSignUp/>} />
        <Route exact path="/admin/orders" element={isAuthenticated && (isAdmin&&user.role==="admin")? <OrderList/> : <LoginSignUp/>} />
        <Route exact path="/admin/order/:id" element={isAuthenticated && (isAdmin&&user.role==="admin")? <ProcessOrder/> : <LoginSignUp/>} />
        <Route exact path="/admin/users" element={isAuthenticated && (isAdmin&&user.role==="admin")? <UsersList/> : <LoginSignUp/>} />
        <Route exact path="/admin/user/:id" element={isAuthenticated && (isAdmin&&user.role==="admin")? <UpdateUser/> : <LoginSignUp/>} />
        <Route exact path="/admin/reviews" element={isAuthenticated && (isAdmin&&user.role==="admin")? <ProductReviews/> : <LoginSignUp/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
