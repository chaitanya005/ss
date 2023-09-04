import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import db from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { getUserUid } from "../../features/user/userSlice";
import cart, {
  addToCart,
  removeItem,
  setTotalBill,
  storeCart,
  updateCart,
  setCouponName,
  removeDryFruitItem,
  removeFoodItem,
  removeClothItem,
} from "../../features/cart/cart";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { saveVeggies, storedVeggies } from "../../features/veggies";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import { getDryFruits } from "../../features/dryfruits";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },

  cartPaper: {
    // position: '',
    // width: '60%',
    marginTop: 30,
    // color: '#000',
    // backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 600,
    overflow: "auto",
  },

  paper: {
    marginTop: 30,
    padding: theme.spacing(2, 4, 3),
  },

  cartCard: {
    marginTop: 10,
    width: 500,
    // height: 200,
    boxShadow: "none",
    border: "1px solid  #eaeaec",
    display: "flex",
    flexDirection: "column",
  },

  cartImg: {
    width: 100,
    margin: 10,
    // borderRadius: 10
    // height: 150
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 300,
  },

  buttons: {
    minWidth: 30,
    marginTop: 6,
    height: 22,
    backgroundColor: "#343a40db",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#343A40",
    },
  },

  deleteIcon: {
    marginTop: 10,
    marginRight: 10,
    cursor: "pointer",
  },
}));

let cartStore;

const Cart = () => {
  const dispatch = useDispatch();
  cartStore = useSelector(storeCart);

  const uId = useSelector(getUserUid);
  const history = useHistory();

  let allVeggies = [];

  useEffect(() => {
    db.collection("veggies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        let docu = doc.data();
        let id = doc.id;

        allVeggies = [...allVeggies, { veggieId: id, ...docu }];
      });
      // console.log(allVeggies);
      dispatch(
        saveVeggies({
          allVeggies,
        })
      );
    });
  }, []);

  let yourBill = 0;
  let marketPrice = 0;
  let saveTotal = 0;

  let [billTotal, setBillTotal] = useState(0);

  for (let item of cartStore) {
    yourBill = yourBill + item.newPrice;
    marketPrice += item.actual_price * item.qty;
  }
  // console.log(cartStore);

  saveTotal += marketPrice - yourBill;

  useEffect(() => {
    setBillTotal(yourBill + 20);
    setClicked(false);
  }, [yourBill]);

  // console.log(billTotal);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [coupon, setCoupon] = useState("");
  const [clicked, setClicked] = useState(false);
  const [inValidCoupon, setInValidCoupon] = useState(false);

  const storedVeggie = useSelector(storedVeggies);

  const [showLoginBtn, setShowLoginBtn] = useState(false);

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let flag = 0;
  const handleCheckout = () => {
    // setState({ ...state, open: true });
    if (!uId) {
      // setState({ ...state, open: true });
      history.push("/login");
      window.scrollTo(0, 0);
    } else {
      // window.location.reload();

      let total;
      if (clicked) {
        total = billTotal;
        dispatch(
          setCouponName({
            coupon,
          })
        );
      } else {
        total = yourBill + 20;
        dispatch(
          setCouponName({
            coupon,
          })
        );
      }

      if (flag === 0) {
        for (let veggie of storedVeggie.storeVeggies) {
          for (let cartItems of cartStore) {
            if (cartItems.name === veggie.name) {
              if (
                cartItems.price !== veggie.price ||
                cartItems.in_stock !== veggie.in_stock
              ) {
                window.location.reload();
                flag = 1;
              }
            }
          }
        }
        if (flag === 0) {
          dispatch(
            setTotalBill({
              total,
            })
          );
          history.push("/checkout");
          window.scrollTo(0, 0);
        }
      }
    }
  };

  const handleCoupon = () => {
    // console.log(coupon);

    if (coupon === "SSMGC10" || coupon === "SSRES10" || coupon === "SPONT") {
      setInValidCoupon(false);
      let total = yourBill + 20;
      let discount = 0;
      discount = (10 / 100) * total;
      // console.log(discount);
      // let discountBilll = total - Math.ceil(discount);
      let discountBilll = 5;
      setBillTotal(discountBilll);

      // setCoupon("");
      setClicked(true);
    } else {
      setInValidCoupon(true);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | Cart </title>{" "}
        <meta property="og:title" content="Spont Store | Cart" />
        <meta name="og:description" content="spont store cart" />
        <style>
          {`
          :root {
            --blue: #007bff;
            --indigo: #6610f2;
            --purple: #6f42c1;
            --pink: #e83e8c;
            --red: #dc3545;
            --orange: #fd7e14;
            --yellow: #ffc107;
            --green: #28a745;
            --teal: #20c997;
            --cyan: #17a2b8;
            --white: #fff;
            --gray: #6c757d;
            --gray-dark: #343a40;
            --primary: #007bff;
            --secondary: #6c757d;
            --success: #28a745;
            --info: #17a2b8;
            --warning: #ffc107;
            --danger: #dc3545;
            --light: #f8f9fa;
            --dark: #343a40;
            --breakpoint-xs: 0;
            --breakpoint-sm: 576px;
            --breakpoint-md: 768px;
            --breakpoint-lg: 992px;
            --breakpoint-xl: 1200px;
            --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        
        *, ::after, ::before {
            box-sizing: border-box;
        }
        
        html {
            font-family: sans-serif;
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
        }
        
        article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
            display: block;
        }
        
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left;
            background-color: #1d1c22;
        }

        hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}

        h1, h2, h3, h4, h5, h6 {
          margin-top: 0;
          margin-bottom: 0.5rem;
      }
      
      p {
          margin-top: 0;
          margin-bottom: 1rem;
      }

      dl, ol, ul {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    
a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;
}

img {
  vertical-align: middle;
  border-style: none;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}

button {
  border-radius: 0;
}

button, input, optgroup, select, textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button, input {
  overflow: visible;
}

button, select {
  text-transform: none;
}

[type="button"], [type="reset"], [type="submit"], button {
  -webkit-appearance: button;
}

[type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled), button:not(:disabled) {
  cursor: pointer;
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.h1, h1 {
  font-size: 2.5rem;
}

.h2, h2 {
  font-size: 2rem;
}

.h4, h4 {
  font-size: 1.5rem;
}

.h5, h5 {
  font-size: 1.25rem;
}

hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
      max-width: 540px;
  }
}


@media (min-width: 768px) {
  .container {
      max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
      max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
      max-width: 1140px;
  }
}

.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-auto {
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: auto;
  max-width: 100%;
}

.col-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 576px) {
  .col-sm-5 {
    -ms-flex: 0 0 41.666667%;
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
}

.col-sm-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
}

.col-sm-7 {
    -ms-flex: 0 0 58.333333%;
    flex: 0 0 58.333333%;
    max-width: 58.333333%;
}
}

@media (min-width: 768px) {
  .col-md-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}

.col-md-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.col-md-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

.order-md-last {
  -ms-flex-order: 13;
  order: 13;
}
}


@media (min-width: 992px) {
  .col-lg-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
  }

  .col-lg-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .order-lg-last {
    -ms-flex-order: 13;
    order: 13;
 }
}


.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control::-webkit-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-group {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 100%;
}

.input-group > .custom-file, .input-group > .custom-select, .input-group > .form-control, .input-group > .form-control-plaintext {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.input-group > .custom-select:not(:last-child), .input-group > .form-control:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.nav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
}

.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}

.embed-responsive {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
}

.embed-responsive::before {
    display: block;
    content: "";
}

.embed-responsive .embed-responsive-item, .embed-responsive embed, .embed-responsive iframe, .embed-responsive object, .embed-responsive video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.embed-responsive-4by3::before {
    padding-top: 75%;
}

.position-relative {
  position: relative !important;
}

.w-100 {
  width: 100% !important;
}
.mw-100 {
  max-width: 100% !important;
}

.mb-0, .my-0 {
  margin-bottom: 0 !important;
}

.mr-2, .mx-2 {
  margin-right: 0.5rem !important;
}

.ml-2, .mx-2 {
  margin-left: 0.5rem !important;
}
.mt-3, .my-3 {
  margin-top: 1rem !important;
}

.mt-5, .my-5 {
  margin-top: 3rem !important;
}

.mb-5, .my-5 {
  margin-bottom: 3rem !important;
}

.m-auto {
    margin: auto !important;
}

.mr-auto, .mx-auto {
  margin-right: auto !important;
}

.ml-auto, .mx-auto {
  margin-left: auto !important;
}

@media (min-width: 992px) {
  .mr-lg-0, .mx-lg-0 {
    margin-right: 0 !important;
  }

  .ml-lg-0, .mx-lg-0 {
    margin-left: 0 !important;
}
}

.text-center {
    text-align: center !important;
}

          `}
        </style>
        <style>
          {`
        body {
          font-family: "Poppins";
          color: #747d88;
          background-color: #1d1c22;
          font-size: 1rem;
          line-height: 1.7;
          position: relative;
      }
      
      .container, .container-fluid {
          padding-left: 1rem;
          padding-right: 1rem;
      }

      .row {
        margin-left: -1rem;
        margin-right: -1rem;
    }
    
    .col, .col-auto, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col-sm, .col-sm-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .grid {
      margin-top: -2rem;
  }
  
  .grid > .col, .grid > [class*="col-"] {
      margin-top: 2rem;
  }
  .grid-sm {
    margin-top: -1rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
}

.bg-theme, .bg-body-main, .bg-back-image, .bg-orange {
  background-color: #ffb524 !important;
}

.grid-sm > .col, .grid-sm > [class*="col-"] {
    margin-top: 1rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
}

.cols-xl {
  margin-top: -6rem;
}

.cols-xl > .col, .cols-xl > [class*="col-"] {
  margin-top: 6rem;
}

p, ul {
  margin-bottom: 0;
}

h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, .display-1, .display-2, .display-3, .display-4, .display-res-1, .display-res-2, .display-res-3, .display-res-4 {
  font-weight: 700;
  line-height: 1.125;
  margin-bottom: 0;
}

h1, .h1 {
  font-size: 3rem;
}

h2, .h2 {
  font-size: 2.25rem;
  line-height: 1.25;
}

h4, .h4 {
  font-size: 1.5rem;
  line-height: 1.4;
}

h5, .h5 {
  font-size: 1.125rem;
  line-height: 1.4;
}

a {
  color: #fff;
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
  outline: 0 none;
}

a:hover {
    text-decoration: none;
    opacity: 0.7;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
    filter: alpha(opacity=70);
    // color: #ffb524;
}

.content-link {
  color: inherit;
}
.list-titled {
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-titled li {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.list-titled .list-item-title {
  color: #fff;
  margin-right: 0.5rem;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  font-weight: 700;
  // font-family: "Rubik";
}

.list-titled .list-item-value {
  margin-top: 0.5rem;
  width: 100%;
}

.list-titled .separator-line {
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .list-titled .list-item-value {
      margin-top: 0;
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
      -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
  }
}

.text-theme, .text-back-image, .text-orange {
    color: #ffb524 !important;
}

.bg-body-back {
  background-color: #343a40 !important;
}

.bg-vegetables-pattern-white {
  background-image: url("/images/vegetables-pattern-white.webp");
  background-position: 0 0;
  background-repeat: repeat;
}

.opacity-3 {
  opacity: 0.03 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=3)" !important;
  filter: alpha(opacity=3) !important;
}

.opacity-70 {
  opacity: 0.7 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)" !important;
  filter: alpha(opacity=70) !important;
}


.z-index-4 {
  z-index: 4;
}

.white-curve-before, .white-curve-after {
  position: relative;
}

.white-curve-before:before, .white-curve-after:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  width: 100%;
  height: 55px;
  background-image: url("/assets/images/parts/black-curve.png");
  background-repeat: repeat-x;
}

.white-curve-after:after {
  bottom: 0;
  background-position: 70% 0;
}

.white-curve-before:before {
  top: 0;
  background-position: 70% 100%;
}

.curve-before-80:before {
  background-position: 80% 100%;
}

.logo-icon {
  font-size: 0.65em;
  padding-bottom: 0.05em;
  display: block;
}

.logo-text {
  font-size: 0.275em;
  display: block;
}

.logo-element-line {
  position: relative;
  font-weight: 500;
  display: inline-block;
  vertical-align: top;
  line-height: 1;
  height: 1em;
  font-size: 1em;
  color: inherit;
  text-align: center;
  z-index: 1;
}

.logo-element-line .logo-icon, .logo-element-line .logo-text {
  display: inline-block;
  vertical-align: baseline;
}

.logo-element-line .logo-icon {
  font-size: 1em;
  padding-bottom: 0;
}

.logo-element-line .logo-text {
  font-size: 0.525em;
  line-height: 0.7;
  padding-left: 0.5em;
}

.separator-line {
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #ffb524;
}

.svg-content {
  display: inline-block;
  line-height: 1;
  vertical-align: top;
}

.cover-image {
  display: block;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.section {
  margin-top: 8rem;
  margin-bottom: 8rem;
}

.section-solid {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

.section-solid, .section-solid-sm {
  position: relative;
  z-index: 1;
}

.section-title {
  color: #fff;
  // font-family: "Rubik";
}

.section-block {
  margin-top: 6rem;
}

.section-white-text {
  color: #fff !important;
}

.section-white-text .section-title, .section-white-text .section-text, .section-white-text .navbar-brand, .section-white-text .entity .entity-title, .section-white-text .entity .entity-subtitle, .section-white-text .entity-simple .entity-title, .section-white-text .entity-simple .entity-subtitle, .section-white-text.entity-banner .entity-title, .section-white-text.entity-banner .entity-subtitle {
  color: #fff;
}

.with-back {
  position: relative;
  z-index: 1;
}

.overflow-back, .back-block, .full-block {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.overflow-back, .back-block {
  z-index: -1;
  pointer-events: none;
  cursor: default;
}

.overflow-back {
  overflow: hidden;
}

.page-breadcrumbs {
  font-size: 0.875rem;
  font-weight: 600;
}

.cart-header, .cart-item-entity {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  text-align: center;
}

.cart-header, .cart-item-title {
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
}

.cart-item-title, .cart-title {
  // font-family: "Rubik";
}

.cart-header {
  font-size: 1.5rem;
}

.cart-header .cart-title {
  margin-bottom: 2rem;
}

.cart-item-image {
    width: 12.5rem;
    margin: 0 auto 1.5rem;
}

.cart-item-quantity .input-group {
    width: 100%;
    max-width: 15rem;
    margin: 0 auto;
}

.cart-item-entity {
    position: relative;
    padding-top: 2rem;
    padding-bottom: 2rem;
}


.cart-item-entity .entity-preview {
    border-radius: 0.75rem;
    overflow: hidden;
}

.cart-item-entity .cart-item-title {
    font-size: 1.375rem;
    // margin-bottom: 1rem;
}

.cart-item-entity .cart-item-price, .cart-item-entity .cart-item-total {
    color: #fff;
    font-weight: 700;
    font-size: 1.125rem;
}

.cart-item-entity .cart-item-quantity {
    margin: 1.5rem 0;
}

.cart-item-entity .cart-item-remove {
    font-size: 1.375rem;
    margin-top: 1.5rem;
    line-height: 1;
}

.cart-item-entity .cart-item-remove-text {
    display: inline-block;
    font-size: 1.25rem;
    vertical-align: top;
}

.cart-item-entity .cart-item-total-text, .cart-item-entity .cart-item-remove-text {
    margin-right: 0.75rem;
}

.cart-footer {
  padding-top: 2rem;
}

.cart-footer .btn {
  width: 100%;
}

.cart-block {
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
  background-color: #525063;
}

.cart-totals {
  margin-bottom: 2rem;
  font-size: 1.125rem;
  min-width: 18rem;
}

.cart-totals .list-item-value {
  margin-left: auto;
  text-align: right;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: auto;
  margin-top: 0;
  font-weight: 700;
  color: #ffb524;
}

.cart-totals .list-item-title {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  margin-right: 2rem;
  white-space: nowrap;
}

.cart-totals li + li {
  margin-top: 0.5rem;
}

.cart-totals .separator-line {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.cart-total {
  font-size: 1.375rem;
  line-height: 1.25;
}


@media (min-width: 576px) {
  .cart-item-title, .cart-item-image, .cart-item-price, .cart-item-total, .cart-item-quantity, .cart-item-remove {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -o-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}

.cart-item-title {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  text-align: left;
  -webkit-box-ordinal-group: 2;
  -moz-box-ordinal-group: 2;
  -o-box-ordinal-group: 2;
  -ms-flex-order: 2;
  -webkit-order: 2;
  order: 2;
}

.cart-item-price, .cart-item-total {
  width: 8rem;
}

.cart-item-price, .cart-item-quantity, .cart-item-total {
  -webkit-box-ordinal-group: 5;
  -moz-box-ordinal-group: 5;
  -o-box-ordinal-group: 5;
  -ms-flex-order: 5;
  -webkit-order: 5;
  order: 5;
}

.cart-item-remove {
  -webkit-box-ordinal-group: 3;
  -moz-box-ordinal-group: 3;
  -o-box-ordinal-group: 3;
  -ms-flex-order: 3;
  -webkit-order: 3;
  order: 3;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 3.25rem;
  padding-left: 2rem;
}

.cart-item-quantity {
  width: 15rem;
  padding: 0 2rem;
}

.cart-item-entity {
        -webkit-box-orient: horizontal;
        -moz-box-orient: horizontal;
        -o-box-orient: horizontal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .cart-item-entity:before {
        content: "";
        -webkit-box-ordinal-group: 4;
        -moz-box-ordinal-group: 4;
        -o-box-ordinal-group: 4;
        -ms-flex-order: 4;
        -webkit-order: 4;
        order: 4;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -o-box-flex: 1;
        box-flex: 1;
        -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: 100%;
        margin-bottom: 2rem;
    }

    .cart-item-entity .cart-item-image, .cart-item-entity .cart-item-title, .cart-item-entity .cart-item-price, .cart-item-entity .cart-item-total, .cart-item-entity .cart-item-quantity, .cart-item-entity .cart-item-remove {
        margin: auto 0;
    }

    .cart-item-entity .cart-item-title {
        font-size: 1.125rem;
    }

    .cart-item-entity .cart-item-total-text, .cart-item-entity .cart-item-remove-text {
        display: none;
    }
}

@media (max-width: 991px) {
  .cart-header .cart-item-image, .cart-header .cart-item-title, .cart-header .cart-item-price, .cart-header .cart-item-quantity, .cart-header .cart-item-total, .cart-header .cart-item-remove {
      display: none;
  }
}

@media (min-width: 992px) {
  .cart-header, .cart-item-entity {
      -webkit-box-lines: single;
      -moz-box-lines: single;
      -o-box-lines: single;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  }

  .cart-header {
      -webkit-box-orient: horizontal;
      -moz-box-orient: horizontal;
      -o-box-orient: horizontal;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
  }

  .cart-header .cart-title {
      display: none;
  }

  .cart-item-entity:before {
      display: none;
  }

  .cart-item-remove {
      -webkit-box-ordinal-group: 6;
      -moz-box-ordinal-group: 6;
      -o-box-ordinal-group: 6;
      -ms-flex-order: 6;
      -webkit-order: 6;
      order: 6;
  }
}

.form-title {
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin-bottom: 1rem;
}

.btn {
  font-size: 0.875rem;
  height: 2.875rem;
  line-height: 1.875rem;
  padding: 0.5rem 1.5rem;
  // font-family: "Poppins";
  font-weight: 600;
  border-radius: 1.4375rem;
  text-shadow: none;
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
  border: 0 none !important;
  opacity: 1 !important;
  -ms-filter: none !important;
  filter: none !important;
}

.btn-theme {
  background-color: #ffb524;
  color: #fff;
}

.btn-theme-bordered {
  background-color: transparent;
  color: #ffb524;
  box-shadow: none;
  position: relative;
}

.btn-theme-bordered:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #ffb524;
  border-radius: 1.4375rem;
}

.input-group {
  z-index: 1;
}

.form-control, .input-group-text {
  font-size: 1rem;
  padding: 0.6875rem 1.25rem;
  line-height: 1.5rem;
  height: calc(2.875rem - 2px);
  color: #747d88;
}

.form-control {
  border-color: #6c757d;
  border-radius: 1.4375rem;
  -webkit-box-shadow: 0 0.5rem 1.5rem rgba(160, 116, 29, 0.5);
  box-shadow: 0 0.5rem 1.5rem rgba(160, 116, 29, 0.5);
  background-color: #fff;
}

.form-control::-webkit-input-placeholder {
  color: inherit;
  font-size: inherit;
}

.input-spin {
    width: 10rem;
}

.input-spin .form-control {
    padding-left: 3rem;
    padding-right: 3rem;
    text-align: center;
    border-radius: 1.4375rem !important;
}


.input-decrement, .input-increment {
    z-index: 3;
    position: absolute;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 1.125rem;
    text-align: center;
    color: #747d88;
    cursor: pointer;
}

.input-decrement {
    left: 0.5rem;
}

.input-increment {
    right: 0.5rem;
}

.input-view-flat .input-group-text, .input-view-flat .form-control {
  border: 0 none;
  height: 2.875rem;
}
.input-gray-shadow .form-control {
    box-shadow: none;
}

.after-head {
  position: relative;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
}

.navbar-brand {
  opacity: 1 !important;
  -ms-filter: none !important;
  filter: none !important;
  color: #ffb524;
}


.page-footer {
  background-color: #333;
}

.footer-navbar .nav {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.footer-navbar .nav-link {
  padding: 0;
}

.footer-navbar .footer-title {
  font-weight: 600;
  // font-family: "Rubik";
}

.footer-navbar .navbar-brand {
  line-height: 1;
  display: block;
  opacity: 1 !important;
  -ms-filter: none !important;
  filter: none !important;
}

.footer-view-links {
  padding: 8rem 0 0;
  position: relative;
  text-align: center;
  z-index: 1;
}

.footer-view-links .footer-copy {
  padding: 4rem 0 2rem;
  text-align: center;
}

.footer-view-links .navbar-brand, .footer-view-links .footer-title {
  margin-bottom: 1rem;
}

.footer-view-links .navbar-brand {
  padding: 0 0 0.125em;
  margin-top: -1.25rem;
  font-size: 2.5rem;
}

@media (min-width: 768px) {
  .footer-view-links {
      text-align: left;
  }
}

.entity-preview {
    position: relative;
    display: block;
}

.entity-preview-content {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.entity-preview-show-up {
  overflow: hidden;
}

.entity-preview-show-up .entity-preview-content {
  -webkit-animation-duration: 0.4s;
  -moz-animation-duration: 0.4s;
  -o-animation-duration: 0.4s;
  -ms-animation-duration: 0.4s;
  animation-duration: 0.4s;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  -ms-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeOut;
  -moz-animation-name: fadeOut;
  -o-animation-name: fadeOut;
  -ms-animation-name: fadeOut;
  animation-name: fadeOut;
}

        `}
        </style>
      </Helmet>
      <section
        className="
        after-head
        top-block-page
        with-back
        white-curve-after
        section-white-text
      "
      >
        <div className="overflow-back bg-orange"></div>
        <div className="content-offs-stick my-5 container">
          <div className="section-solid">
            <div className="z-index-4 position-relative">
              <h1 className="section-title">Cart</h1>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/">
                    Home
                  </a>
                  {/* <span className="mx-2">\</span> */}
                  {/* <a className="content-link" href="/dryfruits">
                    Shop
                  </a> */}
                  <span className="mx-2">\</span>
                  <span>Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-0 section">
        <form className="container" action="#" method="POST">
          <div className="cart-items">
            <div className="cart-header">
              <h2 className="cart-title">Products in Cart</h2>
              <div className="cart-item-title">Product</div>
              <div className="cart-item-price">Price</div>
              <div className="cart-item-price">Market Price</div>
              {/* <div className="cart-item-quantity">Quantity</div> */}
              <div className="cart-item-total">Total</div>
              <div className="cart-item-remove"></div>
            </div>
            {cartStore.length === 0 ? (
              <React.Fragment>
                <br />
                <h4 style={{ textAlign: "center" }}>No items in cart</h4>
                <br />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {cartStore.map((cartItem) => (
                  <React.Fragment>
                    <CartItems cartItem={cartItem} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
            {/* <div className="cart-item-entity">
              <div className="cart-item-image">
                <a
                  className="entity-preview-show-up entity-preview"
                  href="#"
                >
                  <span className="embed-responsive embed-responsive-4by3">
                    <img
                      className="embed-responsive-item"
                      src="assets/images/content/720x540/orange.jpg"
                      alt=""
                    />
                  </span>
                  <span className="with-back entity-preview-content">
                    <span className="h3 m-auto text-theme text-center">
                      <i className="fas fa-search"></i>
                    </span>
                    <span className="overflow-back bg-body-back opacity-70"></span>
                  </span>
                </a>
              </div>
              <div className="cart-item-title">
                <a
                  className="content-link"
                  href="#"
                >
                  Orange
                </a>
              </div>
              <div className="cart-item-price">$4.99</div>
              <div className="cart-item-quantity">
                <div className="input-view-flat input-gray-shadow input-spin input-group">
                  <input
                    className="form-control"
                    min="1"
                    name="text"
                    type="text"
                    value="5"
                  />
                  <span className="input-actions">
                    <span className="input-decrement">
                      <i className="fas fa-minus"></i>
                    </span>
                    <span className="input-increment">
                      <i className="fas fa-plus"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="cart-item-total">
                <span className="cart-item-total-text">Item total:</span>$24.95
              </div>
              <div className="cart-item-remove">
                <a href="#">
                  <span className="cart-item-remove-text">
                    remove from cart
                  </span>
                  <i className="fas fa-times"></i>
                </a>
              </div>
            </div> */}
            <div className="separator-line"></div>
            {/* <div className="cart-footer">
              <div className="grid-sm row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <button className="btn btn-theme-bordered" type="submit">
                    clear shopping cart
                  </button>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 mr-auto">
                  <button className="btn btn-theme-bordered" type="submit">
                    update shopping cart
                  </button>
                </div>
                <div className="col-md-4 col-lg-3">
                  <a href="/shop/sarees" className="btn btn-theme">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div> */}
          </div>
          <div className="section-block">
            <div className="cols-xl row">
              <div className="col-lg-6 mr-auto">
                <div className="cart-form">
                  <h5 className="form-title">Coupon Discount</h5>
                  <div className="row grid">
                    <div className="col-12 col-sm-7">
                      <div className="input-view-flat input-gray-shadow input-group">
                        <input
                          className="form-control"
                          name="text"
                          type="text"
                          placeholder="Enter Your Coupon Code Here!"
                          required="required"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-5">
                      <div
                        className="w-100 btn btn-theme-bordered"
                        // type="submit"
                        onClick={handleCoupon}
                      >
                        Apply coupon
                      </div>
                    </div>
                  </div>
                  {inValidCoupon ? (
                    <p style={{ color: "#fff" }}>Please Enter VALID Coupon</p>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="cart-form">
                  <h5 className="form-title">Check Availability</h5>
                  <form autocomplete="off">
                    <div className="row grid">
                      <div className="col-12 col-sm-7">
                        <div className="input-view-flat input-gray-shadow input-group">
                          <input
                            className="form-control"
                            name="text"
                            type="text"
                            placeholder="Enter Pin Code"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <button
                          className="w-100 btn btn-theme-bordered"
                          type="submit"
                        >
                          check
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
              <div className="col-auto mx-auto mx-lg-0">
                <div className="cart-block">
                  <ul className="cart-totals list-titled">
                    <li>
                      <span className="list-item-title">Market Price</span>
                      <span className="list-item-value">Rs.{marketPrice}</span>
                    </li>
                    <li>
                      <span className="list-item-title">Your Bill</span>
                      <span className="list-item-value">Rs.{yourBill}</span>
                    </li>
                    {cartStore.length === 0 ? (
                      ""
                    ) : (
                      <li>
                        {/*    <span className="list-item-title">Shipping</span>
                        <span className="list-item-value">Rs.100.00</span> */}
                      </li>
                    )}

                    <li>
                      <span className="list-item-title">You Save</span>
                      <span className="list-item-value">Rs.{saveTotal}</span>
                    </li>
                    <li className="separator-line"></li>
                    <li className="cart-total">
                      <span className="list-item-title">Total</span>
                      {cartStore.length === 0 ? (
                        <span className="list-item-value">Rs.{yourBill}</span>
                      ) : (
                        <span className="list-item-value">Rs.{yourBill}</span>
                      )}
                    </li>
                    {clicked ? (
                      <React.Fragment>
                        {/*  <li>
                          <span className="list-item-title">Discount</span>
                          <span className="list-item-value"> - 10%</span>
                        </li> */}
                        <li className="cart-total">
                          <span className="list-item-title">Grand Total</span>
                          <span className="list-item-value">
                            Rs.{billTotal}
                          </span>
                        </li>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </ul>

                  <div className="w-100 btn btn-theme" onClick={handleCheckout}>
                    Proceed to Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message=""
          key={vertical + horizontal}
        >
          <Alert severity="error" onClose={handleClose}>
            Please Login
          </Alert>
        </Snackbar>
      </section>
    </React.Fragment>
  );
};

const BgImage = styled.div`
  background-image: url("/assets/images/content/1920x1080/antioxidant-carrot-diet-33307.jpg");
`;

const CartItems = ({ cartItem }) => {
  // const classes = useStyles();

  // console.log(cartStore.length);
  const storedVeggie = useSelector(storedVeggies);
  const storedDryFruits = useSelector(getDryFruits);

  const [count, setCounter] = useState(1);
  const [updatePrice, setUpdatePrice] = useState(cartItem.price);
  const dispatch = useDispatch();
  const [halfKilo, setHalfKilo] = useState(false);
  const [pavKilo, setPavKilo] = useState(false);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [currItem, setCurrItem] = useState(null);

  useEffect(() => {
    for (let veggie of storedVeggie.storeVeggies) {
      if (cartItem.name === veggie.name) {
        if (
          cartItem.price !== veggie.price ||
          cartItem.in_stock !== veggie.in_stock
        ) {
          setUpdatePrice(veggie);
          handleRemoveItem(cartItem);
        }
      }
    }

    for (let dryfruit of storedDryFruits.storeDryFruit) {
      if (cartItem.name === dryfruit.name) {
        if (
          cartItem.price !== dryfruit.price ||
          cartItem.in_stock !== dryfruit.in_stock
        ) {
          setUpdatePrice(dryfruit);
          handleRemoveItem(cartItem);
        }
      }
    }
  }, [storedDryFruits.storeDryFruit]);

  const handleIncrement = () => {
    if (count < 5) {
      setCounter(count + 1);
      setUpdatePrice((prev) => prev + cartItem.price);
    }

    if (count === 0.5) {
      setCounter(count + 0.5);
      setUpdatePrice(cartItem.price);
    }

    if (count === 0.25) {
      setCounter(count + 0.25);
      let p = Math.ceil(cartItem.price / 2);
      setUpdatePrice(p);
    }
  };

  const handleDecrement = () => {
    setHalfKilo(false);
    if (count > 1) {
      setCounter(count - 1);
      setUpdatePrice((prev) => prev - cartItem.price);
    }

    if (
      cartItem.name !== "Bottle Gourd" &&
      cartItem.name !== "Drum Sticks" &&
      cartItem.name !== "Cabbage" &&
      cartItem.category !== "dryfruit" &&
      cartItem.category !== "clothing"
    ) {
      // console.log(cartItem.name);
      if (count === 1) {
        setCounter(count - 0.5);
        let p = Math.ceil(cartItem.price / 2);
        setUpdatePrice(p);
      }
    } else {
      setHalfKilo(true);
      // setPavKilo(false);
      setState({ ...state, open: true });
    }

    if (
      cartItem.name === "Green Chilli" ||
      cartItem.name === "Bitter gourd" ||
      cartItem.name === "Capsicum" ||
      cartItem.name === "Beans" ||
      cartItem.name === "Bajji Mirchi" ||
      cartItem.name === "Goru Chikkulu" ||
      cartItem.name === "Broad Beans" ||
      cartItem.name === "Carrot"
    ) {
      if (count === 0.5) {
        setCounter(count - 0.25);
        let p = Math.ceil(cartItem.price / 4);
        setUpdatePrice(p);
      }
    } else {
      // setHalfKilo(false);
      setHalfKilo(true);
      setState({ ...state, open: true });
    }
  };

  useEffect(() => {
    if (cartItem.qty >= 0.25) {
      setCounter(cartItem.qty);
      setUpdatePrice(cartItem.newPrice);
    }
    // console.log(cartItem);
    // console.log(cartItem.qty, cartItem.newPrice);
  }, []);

  useEffect(() => {
    let updatedItem = { ...cartItem, newPrice: updatePrice, qty: count };

    // console.log("updatedItem");
    dispatch(
      updateCart({
        updatedItem,
      })
    );
  }, [count]);

  const [removeCount, setRemoveCount] = useState(false);
  // console.log(removeCount);

  const handleRemoveItem = (removeeItem) => {
    setRemoveCount(true);
    // console.log(removeeItem);
    if (removeeItem.category === "dryfruit") {
      dispatch(
        removeDryFruitItem({
          removeeItem,
        })
      );
    } else if (removeeItem.category === "Food") {
      dispatch(
        removeFoodItem({
          removeeItem,
        })
      );
    } else if (removeeItem.category === "clothing") {
      dispatch(
        removeClothItem({
          removeeItem,
        })
      );
    } else {
      dispatch(
        removeItem({
          removeeItem,
        })
      );
    }
  };

  useEffect(() => {
    // console.log("skdjfsdlkfjsdlkfdsjf");
    if (removeCount === true) {
      window.location.reload();
      setRemoveCount(false);
    }
  }, [removeCount]);

  // console.log(cartItem);
  // let updatedPrice = cartItem.newPrice;

  return (
    <>
      <div className="cart-item-entity">
        <div className="cart-item-image">
          <a className="entity-preview-show-up entity-preview" href="#/">
            <span className="embed-responsive embed-responsive-4by3">
              <img
                className="embed-responsive-item"
                src={cartItem.img}
                alt=""
              />
            </span>
            <span className="">
              <span className="h3 m-auto text-theme text-center">
                <i className="fas fa-search"></i>
              </span>
              <span className="overflow-back bg-body-back opacity-70"></span>
            </span>
          </a>
        </div>
        <div className="cart-item-title">
          {cartItem.category !== "dryfruit" &&
          cartItem.category !== "clothing" ? (
            <a className="content-link" href="#/" style={{ margin: "2%" }}>
              {cartItem.name} / {cartItem.tel_name}
            </a>
          ) : (
            <React.Fragment>
              <a className="content-link" href="#/" style={{ margin: "2%" }}>
                {cartItem.name}
              </a>
              {/* <p
                className="content-link"
                style={{ fontSize: "14px", margin: "2%" }}
              >
                {" "}
                Size: {cartItem.sizeSelect}
              </p> */}
            </React.Fragment>
          )}
        </div>
        {cartItem.category === "dryfruit" ? (
          <div className="cart-item-price">
            Rs. {cartItem.price} / {cartItem.gms}gms
          </div>
        ) : (
          <React.Fragment>
            {/* cartItem.name !== "Bottle Gourd" &&
            cartItem.name !== "Drum Sticks" ? (
              <div className="cart-item-price">Rs. {cartItem.price} /kg</div>
            ) : (
              <div className="cart-item-price">
                Rs. {cartItem.price} / {cartItem.piece} piece
              </div>
            ) */}

            <div className="cart-item-price">Rs. {cartItem.price} </div>
            <div
              className="cart-item-price"
              style={{
                color: "grey",
                textDecoration: "line-through",
              }}
            >
              Rs. {cartItem.actual_price}{" "}
            </div>
          </React.Fragment>
        )}

        {/* <div className="cart-item-quantity">
          <div className="input-view-flat input-gray-shadow input-spin input-group">
           <input
          className="form-control"
          min="1"
          name="text"
          type="text"
          value={count}
        /> 
            <div className="form-control">{count}</div>
            <span className="input-actions">
              <span className="input-decrement" onClick={handleDecrement}>
                <RemoveIcon />
              </span>
              <span className="input-increment" onClick={handleIncrement}>
                <AddIcon />
              </span>
            </span>
          </div>
        </div> */}
        <div className="cart-item-total" style={{ fontSize: "1.5rem" }}>
          <span className="cart-item-total-text">Item total:</span>
          Rs.{updatePrice}
        </div>
        <div
          className="cart-item-remove"
          onClick={() => handleRemoveItem(cartItem)}
        >
          <span className="cart-item-remove-text">remove from cart</span>
          {/* <i className="fas fa-times"></i> */}
          <CloseIcon />
        </div>
      </div>

      {/* <Paper className={classes.cartCard}>
      <div style={{ display: "flex" }}>
        <Link to={`/product-detail?id=${item.prod_id}`}>
          <div style={{ width: "25%" }}>
            <img src={item.prod_img} alt="" className={classes.cartImg} />
          </div>
        </Link>
        <div style={{ width: "75%", marginTop: "10px" }}>
          <Link to={`/product-detail?id=${item.prod_id}`}>
            <H4>{item.prod_name}</H4>
            <P>{item.info}</P>
          </Link>

          <div style={{ display: "flex", marginTop: "5px" }}>
            <H5>Qty</H5>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button className={classes.buttons} onClick={handleIncrement}>
                +
              </Button>
              <Button
                className={classes.buttons}
                disabled
                style={{ color: "#000", backgroundColor: "#fff" }}
              >
                {count}
              </Button>
              <Button className={classes.buttons} onClick={handleDecrement}>
                -
              </Button>
            </ButtonGroup>
          </div>

          <div style={{ marginTop: "15px" }}>
            <H4>
              Price: {"\u20B9"}
              {item.prod_price}
            </H4>
          </div>
        </div>
        <div className={classes.deleteIcon}>
       
          <DeleteIcon />
        </div>
      </div>
    </Paper> */}

      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message=""
        key={vertical + horizontal}
      >
        {halfKilo ? (
          <Alert severity="info" onClose={handleClose}>
            250gms and 500gms are applied to only selected Items.
          </Alert>
        ) : (
          ""
        )}
      </Snackbar> */}
    </>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: row;
  // position: absolute;
  top: 80px;
  // min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
  color: #000;
`;

const H3 = styled.h3`
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 500;
  margin-top: 5px;
`;

const H4 = styled.h4`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 0px;
  color: #000;
`;

const P = styled.div`
  font-size: 14px;
  color: #858d95;
`;

const H5 = styled.h6`
  font-size: 16px;
  margin: 0;
  margin-top: 4px;
  margin-right: 4px;
  padding: 0;
  font-weight: 500;
`;

export default Cart;
