import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import firestore from "../../firebase";
import { getUserDetails } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeOrders, getOrders } from "../../features/order";
import { Helmet } from "react-helmet";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import { useHistory } from "react-router";

const UserOrders = () => {
  const [stateUpdate, setStateUpdate] = useState({
    id: "",
    isOpen: false,
  });
  const userDetails = useSelector(getUserDetails);

  const [userOrders, loading, error] = useCollection(
    db
      .collection("orders")
      .doc(userDetails.uid)
      .collection("order")
      .orderBy("payment_dateTime", "desc")
  );
  const order = useSelector(getOrders);
  const history = useHistory();

  const dispatch = useDispatch([]);

  // const [order, setOrder] = useState([]);

  const handleIsOpen = (id) => {
    setStateUpdate((prev) => ({
      id: id,
      isOpen: !prev.isOpen,
    }));
  };

  // let documents = [];

  useEffect(() => {
    /* if (userDetails.uid) {
      const fetchData = async () => {
        const doc = firestore
          .collection(`orders`)
          .doc(userDetails.uid)
          .collection("order");

        const snapshot = await doc.get();

        snapshot.forEach((doc) => {
          // setOrder([doc.data()]);
          let document = doc.data();

          documents = [...documents, { id: doc.id, ...document }];
        });

        dispatch(
          storeOrders({
            documents,
          })
        );
      };

      fetchData();
    } */
  }, []);

  let documents = [];

  useEffect(() => {
    if (userDetails.uid) {
      userOrders &&
        userOrders.docs.map((order) => {
          // console.log(order.data().payment_dateTime);
          let id = order.id;
          documents = [
            ...documents,
            {
              orderId: id,
              ...order.data().order,
              date: order.data().payment_dateTime,
            },
          ];
        });
      // console.log(orders);
      dispatch(
        storeOrders({
          documents,
        })
      );
    } else {
      history.push("/login");
    }
  }, [userOrders]);

  // console.log(order.yourOrders && order.yourOrders);

  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | Your Orders</title>
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

.h3, h3 {
  font-size: 1.75rem;
}

.h5, h5 {
  font-size: 1.25rem;
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

.d-none {
  display: none !important;
}

@media (min-width: 576px) {
  .d-sm-none {
    display: none !important;
}
}

@media (min-width: 768px) {
  .d-md-none {
    display: none !important;
  }

  .d-md-block {
    display: block !important;
  }
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

.mt-4, .my-4 {
  margin-top: 1.5rem !important;
}

.mt-5, .my-5 {
  margin-top: 3rem !important;
}

.mb-5, .my-5 {
  margin-bottom: 3rem !important;
}

.text-center {
  text-align: center !important;
}

.text-success {
  color: #28a745 !important;
}

        `}</style>

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

h3, .h3 {
  font-size: 1.75rem;
  line-height: 1.25;
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

.text-theme, .text-back-image, .text-orange {
  color: #ffb524 !important;
}

.bg-theme, .bg-body-main, .bg-back-image, .bg-orange {
  background-color: #ffb524 !important;
}

.bg-body-back {
  background-color: #343a40 !important;
}

.bg-vegetables-pattern-white {
  background-image: url("../images/parts/vegetables-pattern-white.png");
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

.z-index-3 {
  z-index: 3;
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

.separator-dashed {
  width: 100%;
  border-top: 1px dashed #c4c4c4;
}

.svg-content {
  display: inline-block;
  line-height: 1;
  vertical-align: top;
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


.section-back-text {
  font-size: 20vw;
  max-width: 100vw;
  overflow: hidden;
  position: absolute;
  right: 50%;
  bottom: 50%;
  color: #fff;
  -webkit-transform: translate(50%, 50%);
  -moz-transform: translate(50%, 50%);
  -o-transform: translate(50%, 50%);
  -ms-transform: translate(50%, 50%);
  transform: translate(50%, 50%);
  opacity: 0.1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)";
  filter: alpha(opacity=10);
  font-weight: 500;
  // font-family: "Rubik";
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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

.entity-title, .entity-subtitle, .entity-value {
  margin-bottom: 1rem;
  // font-family: "Rubik";
}

.entity-image, .entity-number {
  margin-bottom: 1.5rem;
}

.entity-title {
  color: #fff;
}

.entity-number {
  line-height: 0.75;
  color: #ffb524;
}

.entity-content-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.entity-date {
  font-size: 0.875rem;
}

.entity-price, .entity-total {
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
}

.entity-detail-subtotal, .entity-detail-total {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

.entity-detail-subtotal .entity-list-title, .entity-detail-total .entity-list-title, .entity-detail-subtotal .entity-list-value, .entity-detail-total .entity-list-value {
  font-weight: 700;
}

.entity-detail-subtotal .entity-list-title, .entity-detail-total .entity-list-title {
  color: #fff;
}

.entity-detail-subtotal .entity-list-value, .entity-detail-total .entity-list-value {
  margin-left: auto;
  min-width: 8rem;
  color: #ffb524;
}

.entity-detail-total {
  font-size: 1.25rem;
}

.entity-list {
  padding: 0;
  margin: 0 0 1.5rem;
  list-style: none;
}

.entity-list-title {
  margin-right: 0.25rem;
  font-weight: 500;
}

.main-list .entity-list-title {
  margin-right: 0.5rem;
  // font-family: "Rubik";
}

.main-list .entity-list-value {
  font-weight: 600;
  color: #fff;
}


.flex-list {
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
  height: 100%;
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

.entity-content-details {
  padding: 1.5rem;
}

.entity-content-details .entity-list {
  margin-bottom: 0;
}


.entity-line-head, .line-entity {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  font-weight: 700;
  padding: 1rem 0.5rem;
}

.entity-line-head .entity-break, .line-entity .entity-break {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  height: 0;
  padding: 0;
  margin: 0;
  border: 0 none;
  width: 100%;
}

.entity-line-head > :first-child, .line-entity > :first-child {
  padding-left: 1rem;
}

.entity-line-head > :last-child, .line-entity > :last-child {
  padding-right: 1rem;
}

.entity-line-head .entity-number, .line-entity .entity-number, .entity-line-head .entity-date, .line-entity .entity-date, .entity-line-head .entity-total, .line-entity .entity-total, .entity-line-head .entity-status, .line-entity .entity-status, .entity-line-head .entity-expand, .line-entity .entity-expand, .entity-line-head .entity-order-number, .line-entity .entity-order-number, .entity-line-head .entity-line-image, .line-entity .entity-line-image, .entity-line-head .entity-price, .line-entity .entity-price, .entity-line-head .entity-quantity, .line-entity .entity-quantity, .entity-line-head .entity-quantity-field, .line-entity .entity-quantity-field, .entity-line-head .entity-line-btn, .line-entity .entity-line-btn, .entity-line-head .entity-line-remove, .line-entity .entity-line-remove {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: auto 0;
  min-height: 1px;
  padding: 1rem;
  min-width: 7rem;
  color: inherit;
}

.entity-line-head .entity-title, .line-entity .entity-title {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-width: 1px;
  min-height: 1px;
  margin: auto 0;
  font-size: 1.125rem;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 1rem;
}

.entity-line-head .entity-line-image, .line-entity .entity-line-image {
  padding-top: 0;
  padding-bottom: 0;
}



.entity-line-head .entity-preview, .line-entity .entity-preview {
  width: 8rem;
}

.entity-line-head .entity-preview:not(.transparent-image), .line-entity .entity-preview:not(.transparent-image) {
  border-radius: 0.75rem;
  overflow: hidden;
}

.entity-line-head .entity-total, .line-entity .entity-total, .entity-line-head .entity-price, .line-entity .entity-price {
  color: #fff;
}

.entity-line-head .entity-price, .line-entity .entity-price, .entity-line-head .entity-date, .line-entity .entity-date {
  font-size: inherit;
}

.entity-line-head .entity-order-number, .line-entity .entity-order-number, .entity-line-head .entity-status, .line-entity .entity-status, .entity-line-head .entity-price, .line-entity .entity-price {
  min-width: 10rem;
}

.entity-line-head .entity-expand, .line-entity .entity-expand {
  color: #ffb524;
  min-width: 3rem;
  font-size: 1.25em;
  padding-right: 0 !important;
  padding-left: 0 !important;
  text-align: center;
}


.entity-line-items {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.entity-line-items .line-entity .entity-quantity {
  min-width: 4rem;
}

.entity-line-items .line-entity .entity-total {
  min-width: 10rem;
}

.order-line-head-entity .entity-line-head {
  padding-top: 0;
  padding-bottom: 0;
  color: #fff;
}

.order-line-head-entity .entity-line-head > * {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: inherit;
}


.entity-expandable {
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
}

.entity-expandable .entity-expand-head {
  cursor: pointer;
}

.entity-expandable .entity-expand {
  opacity: 1;
  -ms-filter: none;
  filter: none;
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}

.entity-expandable .entity-active-rotate {
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  transform: rotate(-180deg);
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}


.entity-expandable:not(.active):hover .entity-expand {
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}

.entity-expandable:not(.active) .entity-active-rotate {
  -webkit-transform: rotate(0);
  -moz-transform: rotate(0);
  -o-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}


.entity-hover-only-shadow-block {
  position: relative;
  -webkit-box-shadow: 0 0 transparent;
  box-shadow: 0 0 transparent;
  border-radius: 0;
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}

.entity-hover-only-shadow-block.dash-separated-entity {
  -webkit-transition: all 0.2s linear 0s, border-top 0s linear 0s;
  -moz-transition: all 0.2s linear 0s, border-top 0s linear 0s;
  -o-transition: all 0.2s linear 0s, border-top 0s linear 0s;
  -ms-transition: all 0.2s linear 0s, border-top 0s linear 0s;
  transition: all 0.2s linear 0s, border-top 0s linear 0s;
}

.entity-hover-only-shadow-block.dash-separated-entity:not(.entity-disabled):hover, .entity-hover-only-shadow-block.dash-separated-entity.active, .entity-hover-only-shadow-block.dash-separated-entity:not(.entity-disabled):hover + .dash-separated-entity, .entity-hover-only-shadow-block.dash-separated-entity.active + .dash-separated-entity {
  border-top-color: transparent !important;
}

.entity-hover-only-shadow-block:not(.entity-disabled):hover, .entity-hover-only-shadow-block.active {
  -webkit-box-shadow: 0 0.5rem 1rem rgba(153, 153, 153, 0.3);
  box-shadow: 0 0.5rem 1rem rgba(153, 153, 153, 0.3);
  border-radius: 0.75rem;
  background-color: #292830;
}

.entity-hover-only-shadow-block:not(.entity-disabled):hover {
  z-index: 3;
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
          <div className="section-solid with-back">
            <div className="full-block">
              <div className="section-back-text">My Orders</div>
              {/* <img
                className="d-none-1 d-lg-block z-index-3"
                src="/images/svg/bread_crumb_img.svg"
                alt=""
                data-size="280px"
                data-at="10%;bottom 35%"
                style={{ width: "400px" }}
              /> */}
            </div>
            <div className="z-index-4 position-relative text-center">
              <h1 className="section-title">Your Orders</h1>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/">
                    Home
                  </a>
                  <span className="mx-2">\</span>
                  <span>Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 section">
        <div className="container">
          <div className="order-line-head-entity d-none d-md-block">
            <div className="entity-line-head">
              <div className="entity-order-number">Order</div>
              <div className="entity-title"></div>
              <div className="entity-date"></div>
              <div className="entity-total">Total</div>
              <div className="entity-status">Status</div>
            </div>
          </div>
          {order &&
            order.yourOrders.map((eachOrder, i) => (
              <React.Fragment>
                <Accordion
                  style={{ backgroundColor: "#1d1c22", marginTop: "3%" }}
                >
                  <div className="entity-accordion-group">
                    <div
                      className="
          order-line-entity
          dash-separated-entity
          entity-hover-only-shadow-block entity-expandable
        "
                      id="order-923776A"
                      data-theme-accordion="orders-list"
                      style={{
                        backgroundColor: "#292830",
                        borderRadius: "0.75rem",
                      }}
                    >
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={() => handleIsOpen(eachOrder.orderId)}
                      >
                        <div className="entity-line-head entity-expand-head">
                          <div className="entity-expand">
                            <div className="entity-active-rotate">
                              <i className="fas fa-angle-double-down fa-fw"></i>
                            </div>
                          </div>
                          <div
                            className="entity-number"
                            style={{ color: "#ffb524" }}
                          >
                            #{eachOrder.orderId}
                          </div>
                          <div className="entity-break d-sm-none"></div>
                          <div className="entity-title"></div>
                          <div className="entity-break d-md-none"></div>
                          <div className="entity-total">
                            Rs.{eachOrder[3].total}
                          </div>
                          {eachOrder[5] &&
                          eachOrder[5].paymentStatus === "Success" ? (
                            <div className="entity-status text-success">
                              Order Placed
                            </div>
                          ) : (
                            ""
                          )}
                          {eachOrder[5] &&
                          eachOrder[5].paymentStatus === "Not Yet Done" ? (
                            <div
                              className="entity-status text-warning"
                              style={{ color: "red" }}
                            >
                              Order Not Placed
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </AccordionSummary>
                      {stateUpdate.id == eachOrder.orderId &&
                      stateUpdate.isOpen === true ? (
                        <React.Fragment>
                          <AccordionDetails style={{ display: "block" }}>
                            <React.Fragment>
                              <div className="">
                                <div className="separator-dashed"></div>
                                <div className="entity-line-items">
                                  {eachOrder[1].orderItems.map((orderItems) => (
                                    <React.Fragment>
                                      <div className="line-entity">
                                        <div className="entity-line-image">
                                          <a
                                            className="entity-preview-show-up entity-preview"
                                            href="#/"
                                          >
                                            <span className="embed-responsive embed-responsive-4by3">
                                              <img
                                                className="embed-responsive-item"
                                                src={orderItems.img}
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
                                        <div className="entity-title">
                                          <a className="content-link" href="#/">
                                            {orderItems.name}
                                          </a>
                                        </div>
                                        <div className="entity-break d-md-none"></div>
                                        <div className="entity-price">
                                          Rs. {orderItems.price}
                                        </div>
                                        <div
                                          className="entity-quantity"
                                          style={{ color: "#fff" }}
                                        >
                                          x{orderItems.qty}
                                        </div>
                                        <div className="entity-total">
                                          Rs. {orderItems.newPrice}
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>

                                <div className="separator-dashed"></div>
                                <div className="entity-content-details">
                                  <div
                                    className="entity-content-title"
                                    style={{ color: "#fff" }}
                                  >
                                    Order information
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 col-lg-4">
                                      <ul className="main-list entity-list">
                                        <li>
                                          <span
                                            className="entity-list-title"
                                            style={{ color: "#fff" }}
                                          >
                                            Name:
                                          </span>
                                          <span
                                            className="entity-list-value"
                                            style={{ color: "#ffb524" }}
                                          >
                                            {eachOrder[2].name}
                                          </span>
                                        </li>
                                        <li>
                                          <span
                                            className="entity-list-title"
                                            style={{ color: "#fff" }}
                                          >
                                            Addresss:
                                          </span>
                                          <span className="entity-list-value"></span>
                                        </li>
                                        <li>
                                          <span className="entity-list-title"></span>
                                          <span
                                            className="entity-list-value"
                                            style={{ color: "#ffb524" }}
                                          >
                                            {eachOrder[2].address}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                      <ul className="main-list entity-list">
                                        {eachOrder.date !== undefined && (
                                          <li>
                                            <span
                                              class="entity-list-title"
                                              style={{ color: "#fff" }}
                                            >
                                              Date & Time:
                                            </span>
                                            <span
                                              class="entity-list-value"
                                              style={{ color: "#ffb524" }}
                                            >
                                              {eachOrder.date}
                                            </span>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                    <div className="mt-4 mt-lg-0 col-md-6 col-lg-4">
                                      <ul className="flex-list entity-list">
                                        <li className="entity-detail-subtotal">
                                          <span className="entity-list-title">
                                            Sub Total:
                                          </span>
                                          <span className="entity-list-value">
                                            Rs. {eachOrder[3].total}
                                          </span>
                                        </li>

                                        <li className="separator-line my-3"></li>
                                        <li className="entity-detail-total">
                                          <span className="entity-list-title">
                                            Total:
                                          </span>
                                          <span className="entity-list-value">
                                            Rs. {eachOrder[3].total}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          </AccordionDetails>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Accordion>
              </React.Fragment>
            ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default UserOrders;
