import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  removeCart,
  setOrderId,
  storeCart,
  setBillingDetails,
  getTotalBill,
  couponApplied,
} from "../../features/cart/cart";
import firestore from "../../firebase";
import { useHistory } from "react-router-dom";
import { getUserDetails } from "../../features/user/userSlice";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getUserUid, getUserName } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { Helmet } from "react-helmet";
import MetaTags from "react-meta-tags";
import moment from "moment";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
init("user_sJSKzvb1LdoFGWAuBrrb0");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CheckoutPage = () => {
  const classes = useStyles();
  const cartItems = useSelector(storeCart);
  const totalBill = useSelector(getTotalBill);
  const coupon = useSelector(couponApplied);
  // console.log(coupon);
  const userDetails = useSelector(getUserDetails);
  const userName = useSelector(getUserName);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState({
    type: "PO",
  });
  const [isPaymentSelected, setIsPaymentSelected] = useState(true);

  let yourBill = 0;
  let marketPrice = 0;
  let saveTotal = 0;
  const history = useHistory();
  const uId = useSelector(getUserUid);

  for (let item of cartItems) {
    yourBill = yourBill + item.newPrice;
    marketPrice += item.actual_price * item.qty;
  }

  saveTotal += marketPrice - yourBill;

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handlePaymentType = (e) => {
    setPaymentType({ type: e.target.value });
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    town: "",
    pincode: "",
    phone: "",
    district: "",
    additionInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.na)

    setValues({
      ...values,
      [name]: value,
    });
  };

  // console.log(userDetails.uid);
  let orderId;

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }
  // console.log(cartItems);

  const handlePlaceOrder = async () => {
    // setState({ ...state, open: true });
    if (!uId) {
      setState({ ...state, open: true });
    } else {
      // console.log(cartItems);
      if (
        values.name === "" ||
        values.address === "" ||
        values.phone === "" ||
        values.pincode === "" ||
        values.town === "" ||
        values.district === ""
      ) {
        alert("Please fill all the fields");
      } else if (values.phone.length < 10) {
        alert("Please Enter Valid Phone Number");
      } else {
        orderId =
          "SS" +
          new Date().getDate() +
          new Date().getHours() +
          new Date().getMinutes();
        console.log(orderId);
        if (paymentType.type === undefined) {
          // console.log(paymentType);
          setIsPaymentSelected(false);
          setState({ ...state, open: true });
        } else {
          if (paymentType.type === "PO") {
            setLoading(true);
            setIsPaymentSelected(true);
            // let totalBill = yourBill + 20;
            // var amount = totalBill;

            let order = [];
            let payment_dateTime = moment(Date.now()).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            if (coupon) {
              order = [
                { orderId: "ORDERID_" + orderId },
                { orderItems: [...cartItems] },
                { ...values },
                { total: totalBill },
                { appliedCoupon: coupon },
                { paymentStatus: "Not Yet Done" },
              ];
            } else {
              order = [
                { orderId: "ORDERID_" + orderId },
                { orderItems: [...cartItems] },
                { ...values },
                { total: yourBill },
                { appliedCoupon: "" },
                { paymentStatus: "Not Yet Done" },
              ];
            }

            try {
              firestore
                .collection("orders")
                .doc(userDetails.uid)
                .collection("order")
                .doc("ORDERID_" + orderId)
                .set({
                  order,
                  payment_dateTime,
                })
                .then(() => {
                  // history.push("/veggies/shop");
                  dispatch(
                    setOrderId({
                      orderId,
                    })
                  );
                  // console.log(res);
                  // handleNotion();
                  paymentGateway();
                });
            } catch (error) {
              console.log("Error in placing order", error);
              history.push("/order/failure");
            }
          } else {
            handleSaveOrder();
          }
        }

        // const orderRef = firestore.collection(`orders`).doc(userDetails.uId);
      }
    }
  };

  const paymentGateway = async () => {
    let totalValues = [{ ...values }, yourBill];
    dispatch(
      setBillingDetails({
        values,
      })
    );

    var phone_number = values.phone;
    var email = values.email;
    orderId = "ORDERID_" + orderId;
    /* let params = {
              orderId: orderId,
              email: email,
              amount: yourBill + 100,
              phone_number: phone_number,
            }; */

    let params = [];
    if (coupon) {
      params = {
        orderId: orderId,
        email: email,
        amount: totalBill,
        phone_number: phone_number,
      };
    } else {
      params = {
        orderId: orderId,
        email: email,
        amount: yourBill,
        phone_number: phone_number,
      };
    }

    var url = "https://paytm-payment-gateway.herokuapp.com/payment";
    // var url = "http://localhost:7000/payment";
    var request = {
      url: url,
      params: params,
      method: "get",
    };

    const response = await axios(request);
    // console.log(response);
    const processParams = await response.data;
    console.log(processParams);

    var details = {
      // action: "https://securegw-stage.paytm.in/order/process",
      action: "https://securegw.paytm.in/order/process",
      params: processParams,
    };

    post(details);
  };

  const handleSaveOrder = async () => {
    setLoading(true);
    let order = [];
    if (coupon) {
      order = [
        { orderId: orderId },
        { orderItems: [...cartItems] },
        { ...values },
        { total: totalBill },
        { appliedCoupon: coupon },
      ];
    } else {
      order = [
        { orderId: orderId },
        { orderItems: [...cartItems] },
        { ...values },
        { total: yourBill },
        { appliedCoupon: "" },
      ];
    }

    try {
      firestore
        .collection("orders")
        .doc(userDetails.uid)
        .collection("order")
        .doc(orderId)
        .set({
          order,
        })
        .then(() => {
          // history.push("/veggies/shop");
          dispatch(
            setOrderId({
              orderId,
            })
          );
          // console.log(res);
          handleNotion();
        });
      /* firestore
        .collection("orders")
        .doc(orderId)
        .set({
          order,
        })
        .then(() => {
          // history.push("/veggies/shop");
          dispatch(
            setOrderId({
              orderId,
            })
          );
          // console.log(res);
          handleNotion();
        }); */
    } catch (error) {
      console.log("Error in placing order", error);
      history.push("/order/failure");
    }
  };

  const handleNotion = () => {
    let items = "",
      i = 0;

    for (let item of cartItems) {
      if (item.category !== "dryfruit") {
        items += ` (${i} - ${item.name} - ${item.qty} Kg - ${item.price} Price - ${item.newPrice} Total) `;
      } else {
        items += ` (${i} - ${item.name} - ${item.gms}grams -  ${item.qty} qty - ${item.price} Price - ${item.newPrice} Total) `;
      }
      i++;
    }

    let total = yourBill;

    axios
      .post("https://notion-crm.herokuapp.com/order", {
        items,
        values,
        i,
        orderId,
        total,
        coupon,
      })
      .then((res) => {
        console.log(res);
        dispatch(removeCart());
        handleSendEmail();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        history.push("/order/failure");
      });
  };

  const handleSendEmail = () => {
    var d = new Date(Date.now());
    emailjs
      .send("service_g90sg6l", "template_tp1lc76", {
        from_name: values.name,
        to_name: "Spont Store",
        number: values.phone,
        date: `${d.getDate()}/${d.getMonth()} ${d.getHours()}:${d.getMinutes()}`,
        total_qty: cartItems.length,
        total_price: yourBill + 20,
      })
      .then((res) => {
        console.log("success", res);
        setLoading(false);
        history.push("/order/confirm");
      });
  };

  return (
    <React.Fragment>
      <MetaTags>
        <meta property="og:title" content="Spont Store | Check out" />
        <meta name="description" content="Some description." />
        <meta name="og:description" content="Some og:description" />
      </MetaTags>
      <Helmet>
        <title>Spont Store | Checkout</title>
        <style>{`
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

label {
  display: inline-block;
  margin-bottom: 0.5rem;
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

input[type="checkbox"], input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

textarea {
  overflow: auto;
  resize: vertical;
}

[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
  height: auto;
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

.h3, h3 {
  font-size: 1.75rem;
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

.col-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}


.col-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

@media (min-width: 768px) {
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

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control::-webkit-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

textarea.form-control {
  height: auto;
}

.form-group {
  margin-bottom: 1rem;
}


.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}

.form-check-input {
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.25rem;
}

.form-check-label {
  margin-bottom: 0;
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

.btn:hover {
  color: #212529;
  text-decoration: none;
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

.input-group > .custom-file .custom-file-input:focus ~ .custom-file-label, .input-group > .custom-select:focus, .input-group > .form-control:focus {
  z-index: 3;
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

.position-relative {
  position: relative !important;
}

.mw-100 {
  max-width: 100% !important;
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

.mb-3, .my-3 {
  margin-bottom: 1rem !important;
}

.mb-4, .my-4 {
  margin-bottom: 1.5rem !important;
}

.mt-5, .my-5 {
  margin-top: 3rem !important;
}
.mb-5, .my-5 {
    margin-bottom: 3rem !important;
}


`}</style>

        <style>{`
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

.cols-xl {
  margin-top: -6rem;
}

.cols-xl > .col, .cols-xl > [class*="col-"] {
  margin-top: 6rem;
}

.bg-theme, .bg-body-main, .bg-back-image, .bg-orange {
  background-color: #ffb524 !important;
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

h3, .h3 {
  font-size: 1.75rem;
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
  color: #ffb524;
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
  outline: 0 none;
}

.content-link {
  color: inherit;
}

.text-title {
  color: #fff !important;
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

.order-header, .order-item, .order-subtotal, .order-total {
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
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 100%;
  text-align: left;
  line-height: 1.25;
}

.order-header {
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  font-size: 1.5rem;
}

.order-item {
  position: relative;
  padding-top: 2rem;
  padding-bottom: 2rem;
  line-height: 1.25;
  font-size: 1.125rem;
  border-bottom: 1px dashed #c4c4c4;
}

.order-line-title {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  // font-family: "Rubik";
}

.order-line-total {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 10rem;
}

.order-subtotal {
  font-weight: 700;
  font-size: 1.125rem;
  padding: 2rem 0;
}

.order-subtotal + .order-subtotal {
  padding-top: 0;
}

.order-total {
  font-weight: 700;
  font-size: 1.5rem;
  padding-top: 2rem;
}

.order-subtotal .order-line-title, .order-total .order-line-title {
  color: #fff;
}

.order-subtotal .order-line-total, .order-total .order-line-total {
  color: #ffb524;
}

label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

label.required:after {
  content: "*";
  margin-left: 0.25rem;
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

.btn-wider {
  min-width: 12rem;
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

.form-control:not(:disabled):not(.disabled):hover {
  -webkit-box-shadow: 0 0 0 0.25rem rgba(255, 181, 36, 0.3), 0 0 0 0.25rem #fff, 0 0 1.5rem rgba(160, 116, 29, 0.8);
  box-shadow: 0 0 0 0.25rem rgba(255, 181, 36, 0.3), 0 0 0 0.25rem #fff, 0 0 1.5rem rgba(160, 116, 29, 0.8);
}

textarea.form-control {
  height: calc(7.375rem - 2px);
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}

.form-group {
  margin: 0;
}


.form-check {
  padding-left: 2.25rem;
  line-height: 1.5;
}

.form-check .form-check-input, .form-check .form-check-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
}

.form-check .form-check-icon {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #fff;
  cursor: pointer;
}

.form-check .form-check-icon:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 0.125rem;
  background-color: #ffb524;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}

.form-check .form-check-label {
  font-size: 1rem;
  cursor: pointer;
  padding-top: 0.125rem;
}

.form-check .form-check-input {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
}

.form-check .form-check-input[type="radio"] ~ .form-check-icon, .form-check .form-check-input[type="radio"] ~ .form-check-icon:after {
  border-radius: 50%;
}

.form-check .form-check-input:checked ~ .form-check-icon:after {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}

.input-view-flat .input-group-text, .input-view-flat .form-control {
  border: 0 none;
  height: 2.875rem;
}

.input-view-flat textarea.form-control {
  height: 7.375rem;
}

.input-view-flat .form-check-icon {
  border: 0 none;
}

.input-gray-shadow .form-control {
  box-shadow: none;
}

.input-gray-shadow .form-check-icon {
  // -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 0 0.5rem 1.5rem rgba(204, 204, 204, 0.5);
  // box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 0 0.5rem 1.5rem rgba(204, 204, 204, 0.5);
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

`}</style>
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
              <h1 className="section-title">Billing</h1>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/">
                    Home
                  </a>
                  <span className="mx-2">\</span>
                  <a className="content-link" href="/veggies/shop">
                    Shop
                  </a>
                  <span className="mx-2">\</span>
                  <span>Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div>
            <div className="cols-xl row">
              <div className="col-lg-6">
                <h2 className="text-title mb-5">Billing details</h2>
                <div className="grid row">
                  <div className="col-md-6">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="required">Your Name</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="name"
                          type="text"
                          placeholder="Name"
                          required="required"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="">Your Email</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="email"
                          type="email"
                          placeholder="Email"
                          // required=""
                          values={values.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="required">Address</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="address"
                          type="text"
                          placeholder="Address"
                          required="required"
                          value={values.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="required">Town / City</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="town"
                          type="text"
                          placeholder="Town / City"
                          required="required"
                          value={values.town}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="required">District</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="district"
                          type="text"
                          placeholder="District"
                          required="required"
                          value={values.district}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="required">Postcode / Zip</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="pincode"
                          type="number"
                          placeholder="Postcode / Zip"
                          required="required"
                          value={values.pincode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="required">Phone</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="phone"
                          type="number"
                          placeholder="Phone"
                          required="required"
                          value={values.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    <div className="input-view-flat input-gray-shadow form-group">
                      <label className="h4 mb-3 text-title">
                        Additional Information
                      </label>
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          name="additionInfo"
                          placeholder="Additional Information"
                          style={{ borderRadius: "25px" }}
                          value={values.additionInfo}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="text-title mb-5">Your order</h2>
                <div className="order-items mb-5">
                  <div className="order-header">
                    <div className="order-line-title">Name</div>
                    <div className="order-line-total">Total</div>
                    <div className="order-line">Qty</div>
                  </div>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div
                        className="order-item"
                        key={item.name}
                        style={{ color: "#fff" }}
                      >
                        <div className="order-line-title">{item.name}</div>
                        <div className="order-line-total">
                          Rs. {item.newPrice}
                        </div>
                        <div className="order-line"> {item.qty}</div>
                      </div>
                    ))}

                  <div className="separator-line"></div>
                  <div className="order-subtotal">
                    <div className="order-line-title">Market Price</div>
                    <div className="order-line-total">Rs. {marketPrice}</div>
                  </div>
                  <div className="order-subtotal">
                    <div className="order-line-title">Your Bill</div>
                    <div className="order-line-total">Rs. {yourBill}</div>
                  </div>
                  {/*                   <div className="order-subtotal">
                    <div className="order-line-title">Shipping</div>
                    {cartItems && cartItems.length === 0 ? (
                      <div className="order-line-total">Rs. 0</div>
                    ) : (
                      <div className="order-line-total">Rs. 100.00</div>
                    )}
                  </div> */}
                  <div className="order-subtotal">
                    <div className="order-line-title">You Save</div>
                    <div className="order-line-total">Rs. {saveTotal}</div>
                  </div>
                  <div className="separator-line"></div>

                  <div className="order-total">
                    <div className="order-line-title">Total</div>
                    <div className="order-line-total">Rs. {yourBill}</div>
                  </div>

                  {coupon ? (
                    <React.Fragment>
                      {/* <div className="order-subtotal">
                        <div className="order-line-title">Discount</div>
                        <div className="order-line-total">- 10%</div>
                      </div> */}
                      <div className="order-total">
                        <div className="order-line-title">Total</div>
                        <div className="order-line-total">Rs. {totalBill}</div>
                      </div>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
                <h3 className="text-title mb-4">Payment Details</h3>
                <form onClick={(e) => handlePaymentType(e)}>
                  <div className="grid row">
                    <div className="col-12">
                      <div className="form-groups">
                        <div className="input-view-flat input-gray-shadow form-group">
                          <div className="form-check">
                            <label>
                              <input
                                className="form-check-icon"
                                type="radio"
                                id="pay-online"
                                name="paymentType"
                                value="PO"
                                checked={paymentType.type === "PO"}
                                // onChange={(e) => handlePaymentType(e)}
                                // onChange={() => console.log("slkdjflksdfjklsfj")}
                              />
                              {/* <span className="form-check-icon"></span> */}
                              <div
                                className="form-check-label"
                                for="cash-on-payment"
                              >
                                PAY ONLINE
                              </div>
                            </label>
                          </div>
                        </div>
                        {/*
                          <div className="input-view-flat input-gray-shadow form-group">
                            <div className="form-check">
                              <label>
                                <input
                                  // className="form-check-input"
                                  className="form-check-icon"
                                  type="radio"
                                  id="c-o-d"
                                  name="paymentType"
                                  value="COD"
                                  checked={paymentType.type === "COD"}
                                  // onChange={handlePaymentType}
                                  // onChange={console.log("slkdjflksdfjklsfj")}
                                />
                                <div
                                  className="form-check-label"
                                  for="cash-on-payment"
                                >
                                  CASH ON DELIVERY (COD)
                                </div>
                              </label>
                            </div>
                          </div>
                        */}
                      </div>
                    </div>
                    <div className={classes.wrapper}>
                      <div className="col-12">
                        <div
                          className="btn-wider btn btn-theme"
                          onClick={handlePlaceOrder}
                        >
                          place order
                        </div>
                      </div>
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message=""
        key={vertical + horizontal}
      >
        {!isPaymentSelected ? (
          <Alert severity="error" onClose={handleClose}>
            Please Select Payment mode
          </Alert>
        ) : (
          <Alert severity="error" onClose={handleClose}>
            Please Login!
          </Alert>
        )}
      </Snackbar>
    </React.Fragment>
  );
};
const BgImage = styled.div`
  background-image: url("assets/images/content/1920x1080/antioxidant-carrot-diet-33307.jpg");
`;

export default CheckoutPage;
