import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveVeggies, storedVeggies, inStock } from "../../features/veggies";
import db from "../../firebase";
import { addToCart, storeCart } from "../../features/cart/cart";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import InputBase from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Helmet } from "react-helmet";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Loading from "../Loading";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCollection } from "react-firebase-hooks/firestore";
import DocumentMeta from "react-document-meta";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    // alignItems: "center",
    // width: "45%",
    margin: "0 13.5%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const Shop = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const storedVeggie = useSelector(storedVeggies);
  const storedCartItems = useSelector(storeCart);

  const [isCartItem, setIsCartItem] = useState(false);

  const [realTimePosts, loading, error] = useCollection(
    db.collection("veggies")
  );

  const [searchedItems, setSearchedItems] = useState([]);
  const [inStockVeggies, setInStockVeggies] = useState([]);
  let allVeggies = [];

  // console.log(doc.data());
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    realTimePosts &&
      realTimePosts.docs.map((doc) => {
        if (doc.data().in_stock === true) {
          let docu = doc.data();
          let id = doc.id;

          allVeggies = [...allVeggies, { veggieId: id, ...docu }];
        }
      });

    dispatch(
      saveVeggies({
        allVeggies,
      })
    );
  }, [realTimePosts]);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const [visible, setVisible] = useState(6);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleAddToCart = (veggie) => {
    let inCart = false;
    let newItem = veggie;
    // console.log(veggie);
    if (storedCartItems.length >= 1) {
      for (let item of storedCartItems) {
        if (item.veggieId === veggie.veggieId) {
          setIsCartItem(true);
          setState({ ...state, open: true });
          setTimeout(() => {
            setState({ ...state, open: false });
          }, 1000);
          inCart = true;
          break;
        }
      }

      if (inCart === false) {
        dispatch(
          addToCart({
            newItem,
          })
        );
        setIsCartItem(false);

        setState({ ...state, open: true });

        setTimeout(() => {
          setState({ ...state, open: false });
        }, 1000);
      }
    } else {
      dispatch(
        addToCart({
          newItem,
        })
      );

      setState({ ...state, open: true });

      setTimeout(() => {
        setState({ ...state, open: false });
      }, 1000);
    }
  };

  const handleVisible = () => {
    if (visible < storedVeggie.storeVeggies.length) {
      // console.log("skdjfhjkdlfj");
      setVisible((prev) => prev + 3);
      setHasMore(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      let items = storedVeggie.storeVeggies.filter(
        (veggie) =>
          veggie.name &&
          veggie.tel_key &&
          (veggie.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            veggie.tel_key.toLowerCase().includes(e.target.value.toLowerCase()))
      );
      setSearchedItems(items);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (
      scrollHeight - Math.ceil(scrollTop) === clientHeight + 1 ||
      scrollHeight - Math.ceil(scrollTop) === clientHeight ||
      scrollHeight - parseInt(scrollTop) === clientHeight ||
      scrollHeight - Math.floor(scrollTop) === clientHeight
    ) {
      setHasMore(true);
      if (visible >= storedVeggie.storeVeggies.length) {
        setHasMore(false);
      }
      setTimeout(() => {
        if (visible < storedVeggie.storeVeggies.length) {
          handleVisible();
        }
      }, 1500);
    }
  };

  const fetchMore = () => {
    // console.log(inStockVeggies.concat({ length: 6 }));
    setTimeout(() => {
      setInStockVeggies(inStockVeggies.concat({ length: 6 }));
    }, 1500);
  };

  const meta = {
    title: "Spont Store | Veggiess Shop",
    description: "Online Rythu baaazaar in Chirala",
    canonical: "https://spontstore.com/shop/veggies",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "chirala, veggies, rythu bazaar, chirala online, vegetables chirala",
      },
    },
  };

  return (
    <React.Fragment>
      <DocumentMeta {...meta}>
        <Helmet>
          <title>Spont Store | Veggies Shop</title>
          <meta property="og:title" content="Veggies Shop" />
          <meta name="description" content="Online Rythu bazaar in Chirala" />
          <meta
            property="og:description"
            content="Online Rythuu bazaar in Chirala"
          />
          {/* <link rel="icon" href="/images/favicon.ico" /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="images/favicons/site.webmanifest" />
          <link
            href="/assets/animate.css/animate.min.css"
            rel="stylesheet"
            type="text/css"
            // rel="preload"
          />
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
    color: #fff;
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

table {
  border-collapse: collapse;
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

.h4, h4 {
  font-size: 1.5rem;
}

.h5, h5 {
  font-size: 1.25rem;
}

.mw-100 {
  max-width: 100% !important;
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
}

@media (min-width: 1200px) {
.col-xl-4 {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #fff;
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


.btn-group-sm > .btn, .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
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

@media (max-width: 750px) {
    .d-none-1 {
        width: 200px !important;
        margin-left: -50px;
        margin-top: 200px;
    }
}

.d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
}


@media (min-width: 992px) {

   .d-lg-block {
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

.position-relative {
    position: relative !important;
}

.mt-3, .my-3 {
    margin-top: 1rem !important;
}

.mb-5, .my-5 {
    margin-bottom: 3rem !important;
}

.m-auto {
    margin: auto !important;
}

.text-center {
    text-align: center !important;
}


        `}
          </style>

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

    .row::-webkit-scrollbar {
      display: none;
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
      p, ul {
        margin-bottom: 0;
      }
      h4, .h4 {
        font-size: 1.5rem;
        line-height: 1.4;
    }
    
    h5, .h5 {
        font-size: 1.125rem;
        line-height: 1.4;
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
  background-image: url("/images/vegetables-pattern-white.webp");
  background-position: 0 0;
  background-repeat: repeat;
}

.opacity-3 {
  opacity: 0.03 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=3)" !important;
  filter: alpha(opacity=3) !important;
}

.opacity-30 {
  opacity: 0.3 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)" !important;
  filter: alpha(opacity=30) !important;
}

.opacity-60 {
  opacity: 0.6 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)" !important;
  filter: alpha(opacity=60) !important;
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

.dcover-image {
  display: block;
  width: 100%;
  height: 100%;
  background-position: top;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
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

.section-head:not(.container), .section-footer:not(.container) {
  margin-left: auto;
  margin-right: auto;
  max-width: 540px;
  padding: 0 1rem;
}

.section-head, .section-footer {
  text-align: center;
}


@media (min-width: 768px) {
  .section-head:not(.container), .section-footer:not(.container) {
      max-width: 640px;
  }
}

.section-footer {
  margin-top: 4rem;
}

.section-footer .btn:last-child:first-child {
  min-width: 9rem;
}

.container .section-head, .container .section-footer {
  padding: 0;
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

.fill-color-line {
  height: 0.5rem;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  overflow: hidden;
}

.fill-line-segment {
  min-height: 1px;
  min-width: 1px;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.page-breadcrumbs {
  font-size: 0.875rem;
  font-weight: 600;
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
  background-color: #ffb524 !important;
  color: #fff;
  /* -webkit-box-shadow: 0 0.5rem 1.5rem rgba(160, 116, 29, 0.5); */
  /* box-shadow: 0 0.5rem 1.5rem rgba(160, 116, 29, 0.5); */
}


.btn-theme-white-bordered {
  background-color: transparent;
  color: #fff;
  position: relative;
  -webkit-box-shadow: 0 0 0 0 #fff;
  box-shadow: 0 0 0 0 #fff;
}

.btn-theme-white-bordered:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 1.4375rem;
}

.btn-sm, .btn-group-sm > .btn {
  height: 2.5rem;
  line-height: 1.5rem;
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

.entity-subtext, .entity-text {
  margin-bottom: 1.5rem;
}

.entity-title {
  color: #fff;
}


.entity-price, .entity-total {
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
}

.entity-price .price-unit {
  font-size: 0.875rem;
}

.entity-price-old {
  color: #fff;
  display: inline-block;
  vertical-align: super;
  font-size: 22px;
  text-decoration: line-through;
  margin-left: 0.75rem;
  opacity: 0.5;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
}

.entity-preview {
  position: relative;
  display: block;
}

.entity-preview:hover, .entity-line:hover, .entity:hover, .entity-block:hover, .entity-shadow-block:hover, .entity-inline-block:hover {
  opacity: 1;
  -ms-filter: none;
  filter: none;
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

        .entity-content {
          display: -webkit-box;
          display: -moz-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: box;
          display: flex;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          -o-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
          -webkit-box-orient: vertical;
          -moz-box-orient: vertical;
          -o-box-orient: vertical;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
      }

      .entity-content *:last-child {
        margin-bottom: 0;
    }

    .entity-bottom-line {
      margin-top: auto;
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
      -webkit-box-align: center;
      -moz-box-align: center;
      -o-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-box-lines: multiple;
      -moz-box-lines: multiple;
      -o-box-lines: multiple;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-bottom: -1rem !important;
  }



  .entity-bottom-line > * {
    padding-bottom: 1rem;
}

.entity-bottom-line .entity-price {
    margin-right: auto;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -o-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    min-width: 9rem;
}

.entity-block, .entity-shadow-block {
  width: 100%;
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
  position: relative;
  z-index: 1;
}

.entity-block .entity-content, .entity-shadow-block .entity-content {
  padding: 1.5rem 1.5rem 2rem;
}

.entity-block, .entity-inline-block {
  border-radius: 0.75rem;
  background-color: #292830;
  color: #747d88;
}


.entity-block > .entity-image:not(.transparent-image):first-child, .entity-inline-block > .entity-image:not(.transparent-image):first-child, .entity-block > .entity-preview:not(.transparent-image):first-child, .entity-inline-block > .entity-preview:not(.transparent-image):first-child {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  overflow: hidden;
}

.entity-hover-shadow {
  -webkit-box-shadow: 0 0 0.5rem rgba(153, 153, 153, 0.1);
  box-shadow: 0 0 0.5rem rgba(153, 153, 153, 0.1);
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
}

.entity-hover-shadow:not(.entity-disabled):hover {
  /* -webkit-box-shadow: 0 0.5rem 1rem rgba(153, 153, 153, 0.3); */
  /* box-shadow: 0 0.5rem 1rem rgba(153, 153, 153, 0.3); */
  /* box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
transform: scale(1.05); */
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

.entity-preview-show-up:hover .entity-preview-content {
  -webkit-animation-name: zoomIn;
  -moz-animation-name: zoomIn;
  -o-animation-name: zoomIn;
  -ms-animation-name: zoomIn;
  animation-name: zoomIn;
}
              `}</style>

          <stlye>
            {`
          .row::-webkit-scrollbar {
            display: none;
          }

          .row {
            height: 1500px;
          }
          `}
          </stlye>
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
          <div className="overflow-back">
            {window.innerWidth <= "600" ? (
              <BgImage className="overflow-back cover-image mw-100"></BgImage>
            ) : (
              <DImage className="overflow-back dcover-image mw-100"></DImage>
            )}
          </div>
          <div className="content-offs-stick my-5 container">
            <div className="section-solid with-back">
              <div className="full-block">
                <div className="section-back-text">Shop</div>
                <img
                  className="d-none-1 d-lg-block z-index-3"
                  src=""
                  alt=""
                  data-size="280px"
                  data-at="10%;bottom 35%"
                  style={{ width: "400px" }}
                />
              </div>
              <div className="z-index-4 position-relative text-center">
                <h1 className="section-title" style={{ fontWeight: "800" }}>
                  Rythu bazar
                </h1>
                <h2 className="section-title" style={{ fontWeight: "800" }}>
                  రైతు బజార్
                </h2>
                <div className="mt-3">
                  <div className="page-breadcrumbs">
                    <a className="content-link" href="/">
                      Home
                    </a>
                    <span className="mx-2"> / </span>
                    <span>Shop / Veggies</span>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ marginTop: "4rem" }} id="section">
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Veggies"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => handleSearch(e)}
            />
          </Paper>
          <br />
          <br />
          {/* <div className="container">
            <h3
              style={{
                margin: "auto",
                color: "white",
                width: "50%",
                textAlign: "center",
              }}
            >
              Veggies are not Available Currently!
            </h3>
          </div> */}

          <div className="container">
            {isLoading ? <Loading /> : ""}
            <br />
            <div
              className="grid row"
              id="main-grid"
              onScroll={handleScroll}
              style={{
                height: "800px",
                overflow: "auto",
                // WebkitOverflowScrolling: "none",
              }}
            >
              {!searchTerm ? (
                <React.Fragment>
                  {visible ? (
                    <React.Fragment>
                      {storedVeggie.storeVeggies
                        .slice(0, visible)
                        .map((veggie, i) => (
                          <React.Fragment key={veggie.veggieId}>
                            {veggie.in_stock && (
                              <div className="col-12 col-md-6 col-xl-4 d-flex">
                                <article className="entity-block entity-hover-shadow">
                                  <div
                                    className="entity-preview-show-up entity-preview"
                                    onClick={() => handleAddToCart(veggie)}
                                    // href={`/shop/veggies/product?id=${veggie.veggieId}`}
                                  >
                                    <span className="embed-responsive embed-responsive-4by3">
                                      <img
                                        className="embed-responsive-item"
                                        src={veggie.img}
                                        alt=""
                                      />
                                    </span>
                                    <span className="with-back entity-preview-content">
                                      <span className="m-auto h1 text-theme text-center">
                                        <ShoppingCartIcon
                                          style={{ fontSize: "80px" }}
                                        />
                                      </span>
                                      <span className="overflow-back bg-body-back opacity-70"></span>
                                    </span>
                                  </div>
                                  <div
                                    className="fill-color-line"
                                    data-role="fill-line"
                                  >
                                    <div
                                      className="opacity-30 fill-line-segment bg-theme"
                                      data-role="fill-line-segment"
                                      data-min-width="10"
                                      data-preffered-width="50"
                                      data-max-width="80"
                                    ></div>
                                    <div
                                      className="opacity-60 fill-line-segment bg-theme"
                                      data-role="fill-line-segment"
                                      data-min-width="10"
                                      data-preffered-width="50"
                                      data-max-width="80"
                                    ></div>
                                    <div
                                      className="fill-line-segment bg-theme"
                                      data-role="fill-line-segment"
                                      data-min-width="10"
                                      data-preffered-width="50"
                                      data-max-width="80"
                                    ></div>
                                  </div>
                                  <div className="entity-content">
                                    <h4 className="entity-title">
                                      <a className="content-link" href="#">
                                        {veggie.name} / {veggie.tel_name}
                                      </a>
                                    </h4>
                                    <p className="entity-text">{veggie.desc}</p>
                                    <div className="entity-bottom-line">
                                      <div className="entity-price">
                                        <span className="currency">
                                          Rs. {veggie.price}
                                        </span>

                                        {veggie.name !== "Bottle Gourd" &&
                                        veggie.name !== "Drum Sticks" ? (
                                          <span className="price-unit">
                                            {" "}
                                            / kg
                                          </span>
                                        ) : (
                                          <span className="price-unit">
                                            {" "}
                                            / kg
                                          </span>
                                        )}
                                        <span className="entity-price-old">
                                          Rs. {veggie.actual_price}
                                        </span>
                                      </div>
                                      <div className="entity-action-btns">
                                        <div
                                          className="btn-sm btn btn-theme"
                                          onClick={() =>
                                            handleAddToCart(veggie)
                                          }
                                        >
                                          Add to cart
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      {hasMore ? (
                        <div style={{ margin: "auto", width: "100%" }}>
                          <br />
                          <Loading />
                        </div>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {searchedItems.length === 0 ? (
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                      <br />
                      <h3 style={{ color: "#fff" }}>
                        Searched Item is out of Stock or No Search Results
                      </h3>
                    </div>
                  ) : (
                    ""
                  )}
                  {visible ? (
                    <React.Fragment>
                      {searchedItems.map((veggie, i) => (
                        <React.Fragment key={veggie.veggieId}>
                          {veggie.in_stock && (
                            <div className="col-12 col-md-6 col-xl-4 d-flex">
                              <article className="entity-block entity-hover-shadow">
                                <div
                                  className="entity-preview-show-up entity-preview"
                                  onClick={() => handleAddToCart(veggie)}
                                  // href={`/shop/veggies/product?id=${veggie.veggieId}`}
                                >
                                  <span className="embed-responsive embed-responsive-4by3">
                                    <img
                                      className="embed-responsive-item"
                                      src={veggie.img}
                                      alt=""
                                    />
                                  </span>
                                  <span className="with-back entity-preview-content">
                                    <span className="overflow-back bg-body-back opacity-70"></span>
                                    <span className="m-auto h1 text-theme text-center">
                                      <i className="fas fa-shopping-cart"></i>
                                    </span>
                                  </span>
                                </div>
                                <div
                                  className="fill-color-line"
                                  data-role="fill-line"
                                >
                                  <div
                                    className="opacity-30 fill-line-segment bg-theme"
                                    data-role="fill-line-segment"
                                    data-min-width="10"
                                    data-preffered-width="50"
                                    data-max-width="80"
                                  ></div>
                                  <div
                                    className="opacity-60 fill-line-segment bg-theme"
                                    data-role="fill-line-segment"
                                    data-min-width="10"
                                    data-preffered-width="50"
                                    data-max-width="80"
                                  ></div>
                                  <div
                                    className="fill-line-segment bg-theme"
                                    data-role="fill-line-segment"
                                    data-min-width="10"
                                    data-preffered-width="50"
                                    data-max-width="80"
                                  ></div>
                                </div>
                                <div className="entity-content">
                                  <h4 className="entity-title">
                                    <a className="content-link" href="#">
                                      {veggie.name} / {veggie.tel_name}
                                    </a>
                                  </h4>
                                  <p className="entity-text">{veggie.desc}</p>
                                  <div className="entity-bottom-line">
                                    <div className="entity-price">
                                      <span className="currency">
                                        Rs. {veggie.price}
                                      </span>

                                      {veggie.name !== "Bottle Gourd" &&
                                      veggie.name !== "Drum Sticks" ? (
                                        <span className="price-unit">
                                          {" "}
                                          / kg
                                        </span>
                                      ) : (
                                        <span className="price-unit">
                                          {" "}
                                          / kg
                                        </span>
                                      )}
                                      <span className="entity-price-old">
                                        Rs. {veggie.actual_price}
                                      </span>
                                    </div>
                                    <div className="entity-action-btns">
                                      <div
                                        className="btn-sm btn btn-theme"
                                        onClick={() => handleAddToCart(veggie)}
                                      >
                                        Add to cart
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </section>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          // message="Please  Login"
          key={vertical + horizontal}
          // style={{ background: "#fff", color: "#000" }}
        >
          {isCartItem ? (
            <Alert severity="error" onClose={handleClose}>
              Item Already in Cart
            </Alert>
          ) : (
            <Alert severity="success" onClose={handleClose}>
              Item Added Cart
            </Alert>
          )}
        </Snackbar>
      </DocumentMeta>
    </React.Fragment>
  );
};

const BgImage = styled.div`
  background-image: url("/images/istockphoto.jpg");
`;

const DImage = styled.div`
  background-image: url("/images/farm_1.jpg");
`;

export default Shop;

//view more - 1498
/* i === inStockVeggies.slice(0, visible).length - 1 &&
                        visible < inStockVeggies.length ? (
                          <div className="section-footer">
                            <div
                              className="btn-theme-white-bordered btn"
                              onClick={() => handleVisible(veggie)}
                            >
                              View More
                            </div>
                          </div>
                        ) : (
                          ""
                        ) */
