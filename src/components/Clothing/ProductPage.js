import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// import ReactImageMagnify from "react-image-magnify";
// import SimpleImageSlider from "react-simple-image-slider";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, storeCart } from "../../features/cart/cart";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Loading from "../Loading";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductPage = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [product, loading, error] = useDocument(
    db.collection("men-wear").doc(id)
  );
  const dispatch = useDispatch();
  const storedCartItems = useSelector(storeCart);
  const [isCartItem, setIsCartItem] = useState(false);

  const [availsizes, setAvailSizes] = useState([]);
  const [prodImages, setProdImages] = useState([]);
  const [sizeSelect, setSizeSelect] = useState();
  const [shakeSizes, setShakeSizes] = useState(false);
  // const [isSelected, setstate] = useState(initialState)

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    product && setAvailSizes(product.data().avail_sizes);
    product && setProdImages(product.data().images);
    /* setProdImages(
      ["/images/201001.jpg"],
      ["/images/product-2-big.jpg"],
      ["/images/product-2-big.jpg"]
    ); */
  }, [product]);

  const handleAddToCart = (productItem) => {
    let inCart = false;
    // console.log(productItem);
    // console.log(sizeSelect);

    let newItem = { ...productItem, id, sizeSelect };
    console.log(newItem);
    if (storedCartItems.length >= 1) {
      for (let item of storedCartItems) {
        if (item.id === newItem.id) {
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

      setIsCartItem(false);
      setState({ ...state, open: true });

      setTimeout(() => {
        setState({ ...state, open: false });
      }, 1000);
    }
    setShakeSizes(false);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | {id}</title>
        <style>{`
        body {
          background-color: #fff;
        }

        .sizeicons {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        .slide-image {
          border-radius: 5px
        }
      `}</style>
        <style>{`
        body {
          font-family: "Poppins";
          color: #747d88;
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

a:hover {
  text-decoration: none;
  opacity: 0.7;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
  filter: alpha(opacity=70);
  color: #ffb524;
}

.bg-vegetables-pattern-white {
  background-image: url("/assets/images/parts/vegetables-pattern-white.png"); !important
  background-position: 0 0;
  background-repeat: repeat;
}

.opacity-3 {
  opacity: 0.03 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=3)" !important;
  filter: alpha(opacity=3) !important;
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
  background-image: url("/assets/images/parts/curve.png");
  background-repeat: repeat-x;
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

.section-white-text {
  color: #fff !important;
}

.section-white-text .section-title, .section-white-text .section-text, .section-white-text .navbar-brand, .section-white-text .entity .entity-title, .section-white-text .entity .entity-subtitle, .section-white-text .entity-simple .entity-title, .section-white-text .entity-simple .entity-subtitle, .section-white-text.entity-banner .entity-title, .section-white-text.entity-banner .entity-subtitle {
  color: #fff;
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

.btn {
  font-weight: 600;
  -webkit-transition: all 0.2s linear 0s;
  -moz-transition: all 0.2s linear 0s;
  -o-transition: all 0.2s linear 0s;
  -ms-transition: all 0.2s linear 0s;
  transition: all 0.2s linear 0s;
  // border: 0 none !important;
  opacity: 1 !important;
  -ms-filter: none !important;
  filter: none !important;
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
  font-family: "Rubik";
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
          --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      
      *, ::after, ::before {
          box-sizing: border-box;
      }
      
      html {
          font-family: sans-serif;
          line-height: 1.15;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -ms-overflow-style: scrollbar;
          -webkit-tap-highlight-color: transparent;
      }

      article, aside, figcaption, figure, header, hgroup, main, nav, section {
        display: block;
    }
    
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        // font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
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
  -webkit-text-decoration-skip: objects;
}

figure {
  margin: 0 0 1rem;
}

img {
  vertical-align: middle;
  border-style: none;
}

svg {
  // overflow: hidden;
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

[type="reset"], [type="submit"], button, html [type="button"] {
  -webkit-appearance: button;
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}

.h1, h1 {
  font-size: 2.5rem;
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
  min-height: 1px;
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

@media (min-width: 992px) {
  .col-lg-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-lg-5 {
    -ms-flex: 0 0 41.666667%;
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }

  .col-lg-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
  }

  .col-lg-7 {
      -ms-flex: 0 0 58.333333%;
      flex: 0 0 58.333333%;
      max-width: 58.333333%;
  }

  .col-lg-9 {
    -ms-flex: 0 0 75%;
    flex: 0 0 75%;
    max-width: 75%;
  }
  .order-lg-last {
    -ms-flex-order: 13;
    order: 13;
  }
}

.btn {
  display: inline-block;
  vertical-align: middle;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.fade {
  transition: opacity 0.15s linear;
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
.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}

.nav-tabs .nav-item {
  margin-bottom: -1px;
}

.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}
.tab-content > .tab-pane {
  display: none;
}

.tab-content > .active {
  display: block;
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


        `}</style>
        <style>{`
        .owl-carousel {
          display: none;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
          /* position relative and z-index fix webkit rendering fonts issue */
          position: relative;
          z-index: 1;
        }

        .owl-carousel.owl-loaded {
          display: block;
        }

        .btn {
          transition: all 0.3s;
          text-transform: uppercase;
          padding: 1.5rem 3rem;
          border-radius: 0;
          font-size: 1.3rem;
          font-weight: 700;
          font-family: Poppins, sans-serif;
          line-height: 1.429;
        }

        .btn-dark {
          border-color: #222529;
          background-color: #222529;
          color: #fff;
          box-shadow: none;
        }
        
        .btn-dark:hover, .btn-dark:focus, .btn-dark.focus {
            border-color: #34393f;
            background-color: #34393f;
            color: #fff;
            box-shadow: none;
        }

        .old-price {
          text-decoration: line-through;
          font-size: 1.4rem;
          letter-spacing: 0.005em;
          color: #999;
          margin-right: 3px;
          font-family: Open Sans, sans-serif;
          line-height: 1.5;
      }
      
      .product-price {
          color: #222529;
          font-size: 1.125em;
          line-height: 0.8;
          font-family: Open Sans, sans-serif;
      }
      
      .price-box {
          margin-bottom: 0;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          line-height: 1;
      }

      .nav-tabs {
        margin: 0;
        border: 0;
        border-bottom: 2px solid #e7e7e7;
    }
    
    .nav-tabs .nav-item {
        margin-bottom: -2px;
    }
    
    .nav-tabs .nav-item .nav-link {
        padding: 1.2rem 0;
        border: 0;
        border-bottom: 2px solid transparent;
        color: #282d3b;
        font-weight: 700;
        font-size: 1.4rem;
        line-height: 1;
        font-family: Poppins, sans-serif;
        letter-spacing: 0.01rem;
        text-transform: uppercase;
    }

    .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-item .nav-link.active {
      border-bottom-color: #08c;
      color: #08c;
    }


    html {
      // overflow-x: hidden;
      font-size: 80%;
      // font-size-adjust: 100%;
      // -ms-text-size-adjust: 100%;
      // -webkit-text-size-adjust: 100%;
  }
  
  body {
      color: #777;
      background: #fff;
  }

  ::selection {
    background-color: #08c;
    color: #fff;
}

p {
    margin-bottom: 1.5rem;
}

ul, ol {
    margin: 0 0 2.25rem;
    padding: 0;
    list-style: none;
}

hr {
  max-width: 1730px;
  margin: 5.5rem auto 5.2rem;
  border: 0;
  border-top: 1px solid #e7e7e7;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

@media (max-width: 767px) {
  html {
      // font-size: 9px;
  }
}

h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
  margin-bottom: 1.8rem;
  color: #222529;
  font-weight: 700;
  line-height: 1.1;
  font-family: Poppins, sans-serif;
}

h1, .h1 {
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1.223;
}

h5, .h5 {
  font-size: 1.4rem;
  line-height: 1.429;
}

a {
  transition: all 0.3s;
  color: #08c;
  text-decoration: none;
}

@media (min-width: 768px) {
  h1, .h1 {
    font-size: 4.5rem;
  }  
}

@media (min-width: 992px) {
  h1, .h1 {
    font-size: 5rem;
  }
}

.main {
  flex: 1 1 auto;
}

.row {
  margin-left: -10px;
  margin-right: -10px;
}

.row [class*="col-"] {
  padding-left: 10px;
  padding-right: 10px;
}

@media (min-width: 1220px) {
  .container {
      max-width: 1200px;
  }
}

@media (min-width: 992px) {
  .container {
      padding-left: 10px;
      padding-right: 10px;
  }
}

@media (max-width: 991px) {
  .container {
      max-width: none;
  }
}

footer {
  font-size: 1.3rem;
  color: #777;
  background: #e6e5e2;
  link-active-color: #fff;
  line-height: 2.4rem;
  padding-top: 1px;
  font-size: 1.3rem;
}

footer .container {
  position: relative;
}

footer p {
  color: inherit;
}

footer a {
  color: inherit;
}


.product-single-container {
  margin-bottom: 3rem;
}

.product-single-details {
  margin-top: -0.6rem;
  margin-bottom: 3rem;
}

.product-single-details .product-title {
  margin-bottom: 0.5rem;
  color: #222529;
  font-size: 2.3rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.product-single-details .price-box {
  margin-bottom: 2rem;
  color: #08c;
  font-weight: 700;
  font-family: Poppins, sans-serif;
}

.product-single-details .product-price {
  font-size: 2rem;
  letter-spacing: -0.02em;
  vertical-align: middle;
}

.product-single-details .old-price {
  color: #777;
  font-size: 1.5rem;
  vertical-align: middle;
}

.product-single-details .old-price + .product-price {
  margin-left: 1rem;
}

.product-single-details .divider {
  border-top: 1px solid #e7e7e7;
  margin: 1.5rem 0;
}

.product-single-details .divider + .product-action {
  margin-top: -0.5rem;
}

.product-single-details .product-desc {
  margin-bottom: 3.8rem;
  font-size: 1.3rem;
  letter-spacing: -0.015em;
  line-height: 1.92;
}

.product-single-gallery {
  margin-bottom: 3rem;
}

.product-single-gallery img {
  display: block;
  width: 100%;
  max-width: none;
  height: auto;
}
.product-single-gallery .product-item {
  position: relative;
}
.product-slider-container {
  position: relative;
}
.product-single-tabs {
  margin-bottom: 5.5rem;
}
.product-single-tabs .tab-pane {
  padding-top: 3.5rem;
  color: #7b858a;
  line-height: 1.92;
}
.product-single-tabs .nav.nav-tabs .nav-item .nav-link {
  color: #818692;
}
.product-single-tabs .nav.nav-tabs .nav-item .nav-link.active {
  color: #222529;
}
.product-single-tabs .nav.nav-tabs .nav-link {
  font-family: "Open Sans", sans-serif;
}
.product-single-tabs .nav.nav-tabs .nav-link:hover, .product-single-tabs .nav.nav-tabs .nav-link.active {
  border-bottom-color: #222529;
}
.product-desc-content p {
  margin-bottom: 2.2rem;
  letter-spacing: -0.015em;
}
@media (min-width: 992px) {
  .product-single-container .col-lg-7 {
      -ms-flex: 0 0 55.56%;
      flex: 0 0 55.56%;
      max-width: 55.56%;
  }

  .product-single-container .col-lg-5 {
      -ms-flex: 0 0 44.44%;
      flex: 0 0 44.44%;
      max-width: 44.44%;
  }
}
body {
  // line-height: 2.4rem;
}

.main {
  // font-size: 1.6rem;
}

  
    
      

        `}</style>
        {/* <link href="/assets/css/theme.min.css" rel="stylesheet" /> */}
        {/* <link rel="stylesheet" href="/assets/porto.css" /> */}
        {/* <link rel="stylesheet" href="/assets/style.css" /> */}
      </Helmet>
      <main className="main" style={{ position: "relative", top: "100px" }}>
        {!loading ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-9 main-content">
                <div className="product-single-container product-single-default">
                  <div className="row">
                    <div className="col-lg-7 col-md-6 product-single-gallery">
                      <div className="product-slider-container">
                        <div class="product-single-carousel owl-carousel owl-theme owl-loaded owl-drag">
                          <div className="product-item">
                            {/* <img
                            className="product-single-image"
                            src="images/product-1-big.jpg"
                            data-zoom-image="assets/images/products/zoom/product-1-big.jpg"
                            alt=""
                          /> */}

                            {/* 
                            <SimpleImageSlider
                              className="product-single-image"
                              width={400}
                              height={400}
                              images={images}
                            />
                           */}
                            <Slide
                              infinite={true}
                              autoplay={false}
                              prevArrow={
                                <div
                                  style={{
                                    width: "30px",
                                    marginRight: "-30px",
                                    cursor: "pointer",
                                    color: "#000",
                                  }}
                                >
                                  <KeyboardArrowLeftIcon
                                    style={{ width: "0.8em", height: "0.8em" }}
                                    fontSize="large"
                                  />
                                </div>
                              }
                              nextArrow={
                                <div
                                  style={{
                                    width: "30px",
                                    marginLeft: "-30px",
                                    cursor: "pointer",
                                    color: "#000",
                                  }}
                                >
                                  <KeyboardArrowRightIcon
                                    style={{ width: "0.8em", height: "0.8em" }}
                                    fontSize="large"
                                  />
                                </div>
                              }
                              // indicators={true}
                              transitionDuration={500}
                            >
                              {prodImages.map((slideImage, index) => (
                                <div
                                  className="each-slide"
                                  key={index}
                                  // style={{ width: "400px", height: "400px" }}
                                >
                                  <InnerImageZoom
                                    src={slideImage}
                                    zoomSrc={slideImage}
                                    fullscreenOnMobile={true}
                                  />
                                  {/* <img src={slideImage} alt="" /> */}
                                </div>
                              ))}
                            </Slide>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 product-single-details">
                      <h1 className="product-title">
                        {product && product.data().name}
                      </h1>
                      <hr className="divider" />
                      <div className="price-box">
                        <span className="old-price">
                          Rs.{product && product.data().actual_price}
                        </span>
                        <span className="product-price">
                          Rs. {product && product.data().price}
                        </span>
                      </div>
                      <div className="product-desc">
                        <p>{product && product.data().info}</p>
                        <div>
                          {product &&
                            product.data().desc &&
                            Object.entries(product.data().desc).map((item) => (
                              <React.Fragment>
                                <div style={{ display: "flex" }}>
                                  <p>{item[0]}</p>: <p> {item[1]}</p>
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                      <div className="product-filters-container">
                        {/* <div className="product-single-filter">
                          <label>Colors:</label>
                          <ul className="config-swatch-list">
                            <li className="active">
                              <a
                                href="#/"
                                style={{ backgroundColor: "#0188cc" }}
                              >
                                {" "}
                              </a>
                            </li>
                            <li>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#ab6e6e" }}
                              >
                                {" "}
                              </a>
                            </li>
                            <li>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#ddb577" }}
                              >
                                {" "}
                              </a>
                            </li>
                            <li>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#6085a5" }}
                              >
                                {" "}
                              </a>
                            </li>
                          </ul>
                        </div> */}
                        {/* <div className="product-single-filter">
                          <label>Sizes:</label>
                          {shakeSizes && sizeSelect === undefined ? (
                            <div>
                              <ul className="config-size-list sizeicons">
                                {availsizes.map((i) => (
                                  <li>
                                    <Button
                                      onClick={() => setSizeSelect(i)}
                                      variant="outlined"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {i}
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  margin: "0",
                                }}
                              >
                                Please select size
                              </p>
                            </div>
                          ) : (
                            <ul className="config-size-list">
                              {availsizes.map((i) => (
                                <li>
                                  {i === sizeSelect ? (
                                    <Button
                                      variant="contained"
                                      style={{
                                        fontSize: "14px",
                                        margin: "3px",
                                      }}
                                      onClick={() => setSizeSelect(i)}
                                    >
                                      {i}
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outlined"
                                      // size="small"
                                      style={{
                                        fontSize: "14px",
                                        margin: "3px",
                                      }}
                                      onClick={() => setSizeSelect(i)}
                                    >
                                      {i}
                                    </Button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div> */}
                      </div>

                      <hr className="divider" />

                      <div className="product-action">
                        {product.data().in_stock ? (
                          <div
                            className="btn btn-dark add-cart"
                            style={{
                              // height: "4.5rem",
                              marginRight: "1px",
                              borderRadius: "5px",
                              padding: "11px 28px",
                              fontSize: "1.2rem",
                              lineHeight: "24px",
                            }}
                            // startIcon={}
                            onClick={() => handleAddToCart(product.data())}
                          >
                            <ShoppingCartIcon fontSize="medium" /> Add To Cart
                          </div>
                        ) : (
                          <div
                            className="btn  add-cart"
                            style={{
                              // height: "4.5rem",
                              marginRight: "1px",
                              borderRadius: "5px",
                              color: "red",
                            }}
                          >
                            OUT OF STOCK
                          </div>
                        )}
                        {/* <a
                        href="#/"
                        className="btn btn-dark add-cart"
                        title="Add to Cart"
                        style={{ height: "4.5rem", marginRight: "1px" }}
                      >
                        <ShoppingCartIcon />
                        Add to Cart
                      </a> */}
                        {/* <a
                        href="#cart.html"
                        className="btn btn-dark add-cart"
                        title="Add to Wishlist"
                        style={{ height: "4.5rem", backgroundColor: "#08c" }}
                      >
                        <FavoriteBorderIcon />
                        Add to wishlist
                      </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="product-single-tabs">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="product-tab-desc"
                    data-toggle="tab"
                    href="#product-desc-content"
                    role="tab"
                    aria-controls="product-desc-content"
                    aria-selected="true"
                  >
                    {""}
                  </a>
                </li>
                {/* <li class="nav-item">
                <a
                  class="nav-link"
                  id="product-tab-more-info"
                  data-toggle="tab"
                  href="#product-more-info-content"
                  role="tab"
                  aria-controls="product-more-info-content"
                  aria-selected="false"
                >
                  More Info
                </a>
              </li> */}
              </ul>
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="product-desc-content"
                  role="tabpanel"
                  aria-labelledby="product-tab-desc"
                >
                  <div class="product-desc-content">
                    <p>{/* product && product.data().description */}</p>
                    {/* <ul>
                    <li>
                      <i class="fa fa-check-circle"></i>Any Product types that
                      You want - Simple, Configurable
                    </li>
                    <li>
                      <i class="fa fa-check-circle"></i>Downloadable/Digital
                      Products, Virtual Products
                    </li>
                    <li>
                      <i class="fa fa-check-circle"></i>Inventory Management
                      with Backordered items
                    </li>
                  </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
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
      </main>
    </React.Fragment>
  );
};

export default ProductPage;
