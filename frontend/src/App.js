import './App.css';
import axios from 'axios';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Orders/Myorders.js";
import OrderDetails from "./component/Orders/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UserList from "./component/admin/UserList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReview from "./component/admin/ProductReview.js";
import About from './component/layout/About/About';
import Contact from './component/layout/Contact/Contact';
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);
  
  return(
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path ="/process/payment" component={Payment} />
          </Elements>
        )}

      <Switch>
        <Route path='/' component={Home} exact/>      
        <Route path="/product/:id" component={ProductDetails} exact/>
        <Route path="/products" component={Products} exact />
        <Route path="/search" component={Search} exact />
        <Route path="/about" component={About} exact/>
        <Route path="/contact" component={Contact} exact/>
        <Route path="/login" component={LoginSignUp} exact/>
        <ProtectedRoute path="/account" component={Profile} exact/>
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/Cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path ="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={OrderSuccess}/>
        <ProtectedRoute exact path="/orders" component={MyOrders}/>
        <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products/:id" component={UpdateProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
      <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
      <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReview} />
      <Route path="/products/:keyword" component={Products} />
      <Route component={ window.location.pathname === "/process/payment" ? null : NotFound } />
      </Switch>

      <Footer />
  </Router>
  );
}

export default App;
