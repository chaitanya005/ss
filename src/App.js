import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import MenShirts from "./components/Men/Men_shirts";
// import ProductPage from "./components/Men/Product_page";
import Notion from "./notion";
import HomePage from "./components/Veggies/Homepage";
import VeggiesLandingPage from "./components/Veggies/VeggiesLandingPage";
import Footer from "./components/Veggies/Footer";
import VeggieProduct from "./components/Veggies/ProductPage";
// import { getToken } from "./firebase";
import { useState } from "react";
import OrderFailure from "./components/OrderFailure";
import InfiniteScroll from "./components/InfiniteScroll";

/* import Cart from "./components/Cart/Cart";
import Shop from "./components/Veggies/Shop";
import CheckoutPage from "./components/Cart/Checkout";
import UserOrders from "./components/Veggies/UserOrders";
import LandingPage from "./components/FoodDelivery/LandingPage"; */

/* import OrderConfirmation from "./components/OrderConfirmation";
import PageNotFound from "./components/404";
import TC from "./components/T_C";
import Privacy from "./components/Privacy";
import ReturnRefund from "./components/Return_Refund"; */

import Restaurants from "./components/FoodDelivery/Restaurants";
import HomePageTwo from "./components/FoodDelivery/HomePage";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AboutUs from "./components/AboutUs";
import Cancellation from "./components/Cancellation";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import React, { Suspense, lazy } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "./components/Loading";
import Team from "./components/Team";
import FruitsLand from "./components/Fruits/FruitsLand";
import Cashews from "./components/Fruits/Cashews";
import Detail from "./components/FoodDelivery/Detail";
import { useEffect } from "react";
import ClothShop from "./components/Clothing/Shop";
import ProductPage from "./components/Clothing/ProductPage";
import Productpage from "./components/Men/Product_page";
import OtpLogin from "./OtpLogin";
import Blog from "./components/Blog/Blog";
import ShipmentPolicy from "./components/Shipment_Policy";

// import './App.css'

// const Home = lazy(() => import("./components/Home"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const CheckoutPage = lazy(() => import("./components/Cart/Checkout"));
const Shop = lazy(() => import("./components/Veggies/Shop"));
const UserOrders = lazy(() => import("./components/Veggies/UserOrders"));
const LandingPage = lazy(() => import("./components/FoodDelivery/LandingPage"));

const OrderConfirmation = lazy(() => import("./components/OrderConfirmation"));
const PageNotFound = lazy(() => import("./components/404"));
const TC = lazy(() => import("./components/T_C"));
const Privacy = lazy(() => import("./components/Privacy"));
const ReturnRefund = lazy(() => import("./components/Return_Refund"));

const App = () => {
  /* const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound); */

  /* var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getCoordinates = (pos) => {
    var crd = pos.coords;

    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();
    var coordinates = [lat, lng];
    // console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    getCity(coordinates);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }; */

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(getCoordinates, error, options);
  }, []);

  /* var xhr = new XMLHttpRequest();
  const getCity = (coordinates) => {
    // console.log(coordinates);
    var lat = coordinates[0];
    var lng = coordinates[1];

    xhr.open(
      "GET",
      `https://us1.locationiq.com/v1/reverse.php?key=pk.67ca37b372c05b0b3004029928703945&lat=${lat}&lon=${lng}&format=json`,
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  };

  const processRequest = (e) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var city = response.address.municipality;
      var district = response.address.district;
      console.log(response.address);
      console.log(city);
      return;
    }
  }; */

  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={"Loading...."}>
          <Switch>
            {/* <Route exact path="/">
            <Login />
          </Route> */}
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route path="/men-shirts">
            <MenShirts />
          </Route>
          <Route path="/product-detail">
            <ProductPage />
          </Route> */}
            <Route path="/cart">
              <Cart />
            </Route>
            {/* <Route path="/notion">
            <Notion />
          </Route> */}
            <Route exact path="/veggies">
              <VeggiesLandingPage />
            </Route>
            <Route exact path="/veggies/shop">
              <Shop />
            </Route>
            {/* <Route exact path="/veggies/shop/product">
            <VeggieProduct />
          </Route> */}
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/checkout">
              <CheckoutPage />
            </Route>
            <Route path="/order/confirm">
              <OrderConfirmation />
            </Route>
            <Route path="/order/failure">
              <OrderFailure />
            </Route>
            <Route path="/user/orders">
              <UserOrders />
            </Route>
            <Route path="/food-delivery">
              <LandingPage />
            </Route>
            <Route path="/resto-order">
              <Detail />
            </Route>
            <Route path="/dryfruits">
              <FruitsLand />
            </Route>
            <Route path="/dryfruits/cashews">
              <Cashews />
            </Route>
            {/* <Route path="/resto">
            <Restaurants />
          </Route> */}
            <Route path="/hello">
              <HomePageTwo />
            </Route>
            <Route path="/about-us">
              <AboutUs />
            </Route>
            <Route path="/returnandrefund">
              <ReturnRefund />
            </Route>
            <Route path="/shipment">
              <ShipmentPolicy />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/cancellation">
              <Cancellation />
            </Route>
            <Route path="/termsandconditions">
              <TC />
            </Route>
            <Route path="/shop/sarees">
              <ClothShop />
            </Route>
            <Route path="/saree">
              <ProductPage />
            </Route>
            {/* <Route path="/loading">
              <Loading />
            </Route> */}
            <Route path="/men">
              <Productpage />
            </Route>
            <Route path="/otp">
              <OtpLogin />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/scroll">
              <InfiniteScroll />
            </Route>
            <Route path="/footer">
              <Footer />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
        {/* <Suspense
          fallback={<div style={{ color: "#000" }}>Loading Footer....</div>}
        >
        </Suspense> */}
        <a href="/cart" className="cart_float">
          <ShoppingCartIcon />
        </a>

        <a
          href="https://api.whatsapp.com/send?phone=918790462050&text=Hello!"
          className="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
        </a>
      </Router>
    </div>
  );
};

export default App;
