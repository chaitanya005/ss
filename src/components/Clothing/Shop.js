import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import {
  saveMenShirts,
  getMenShirts,
} from "../../features/men-shirts/menShirt";
import db from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
import Loading from "../Loading";
import Listing from "./Listing";
import InfiniteScroll from "react-infinite-scroll-component";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// import { addToCart, storeCart } from "../../features/cart/cart";
// import MuiAlert from "@material-ui/lab/Alert";
// import Snackbar from "@material-ui/core/Snackbar";

/* function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} */

const Shop = () => {
  const [expanded, setExpanded] = useState("categories");
  const [menprod, loading, error] = useCollection(db.collection("men-wear"));
  const menShirts = useSelector(getMenShirts);
  const dispatch = useDispatch();
  // const [isCartItem, setIsCartItem] = useState(false);

  const [backDropOpen, setBackDropOpen] = useState(false);

  const [minValue, setMinValue] = useState(300);
  const [maxValue, setMaxValue] = useState(20000);
  const [priceFilterProds, setPriceFilterProds] = useState([]);
  const [size, setSize] = useState();
  const [category, setCategory] = useState();
  const [isEmpty, setIsEmpty] = useState(false);

  let [displayProds, setDisplayProds] = useState([]);
  const [items, setItems] = useState([]);
  // const storedCartItems = useSelector(storeCart);

  // const [state, setState] = React.useState({
  //   open: false,
  //   vertical: "top",
  //   horizontal: "center",
  // });

  // const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setBackDropOpen(false);
  };
  const handleToggle = () => {
    setBackDropOpen(!backDropOpen);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(panel);
  };

  let documents = [];

  useEffect(() => {
    menprod &&
      menprod.docs.map((prod) => {
        // console.log(prod.data());
        let docu = prod.data();
        let id = prod.id;
        documents = [...documents, { clothingId: id, ...docu }];
      });
    // console.log(documents);

    dispatch(
      saveMenShirts({
        documents,
      })
    );
  }, [menprod]);

  useEffect(() => {
    menShirts && setDisplayProds(menShirts.menshirts);
    menShirts &&
      setItems(menShirts.menshirts.concat(Array.from({ length: 2 })));
  }, [menShirts]);

  // console.log(displayProds && displayProds);
  // console.log(menShirts);

  /* const handleAddToCart = (shirt) => {
    let inCart = false;
    let newItem = shirt;
    // console.log(shirt);

    if (storedCartItems.length >= 1) {
      for (let item of storedCartItems) {
        if (item.name === name) {
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
  }; */

  const handlePriceFilter = () => {
    let priceFilter = [...menShirts.menshirts];
    priceFilter = priceFilter.filter(
      (shirt) => shirt.price >= minValue && shirt.price <= maxValue
    );
    if (size) {
      priceFilter = priceFilter.filter((prod) =>
        prod.avail_sizes.includes(size)
      );
    }

    if (category) {
      priceFilter = priceFilter.filter(
        (prod) => prod.categoryType === category
      );
    }

    if (priceFilter.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    setPriceFilterProds(priceFilter);
    setDisplayProds(priceFilter);
  };

  const handleSizeFilter = (size) => {
    setSize(size);
    let sizeFilter = [...menShirts.menshirts];
    if (minValue !== 400 || maxValue !== 3000) {
      sizeFilter = sizeFilter.filter((prod) => prod.avail_sizes.includes(size));
      sizeFilter = sizeFilter.filter(
        (prod) => prod.price >= minValue && prod.price <= maxValue
      );
    } else {
      sizeFilter = [...menShirts.menshirts];
      sizeFilter = sizeFilter.filter((prod) => prod.avail_sizes.includes(size));
    }

    if (category) {
      sizeFilter = sizeFilter.filter((prod) => prod.categoryType === category);
    }

    if (sizeFilter.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    setDisplayProds(sizeFilter);
  };

  const handleCategoryFilter = (categoryType) => {
    setCategory(categoryType);
    let categoryFilter = [...menShirts.menshirts];
    categoryFilter = categoryFilter.filter(
      (prod) => prod.categoryType === categoryType
    );

    if (size) {
      categoryFilter = categoryFilter.filter((prod) =>
        prod.avail_sizes.includes(size)
      );
    }

    if (minValue !== 400 || maxValue !== 3000) {
      categoryFilter = categoryFilter.filter(
        (prod) => prod.price >= minValue && prod.price <= maxValue
      );
    }

    if (categoryFilter.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    setDisplayProds(categoryFilter);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(menShirts.menshirts.concat(Array.from({ length: 1 })));
      // setItems(prev => [...prev, ])
    }, 1500);
  };
  // console.log(items);

  // const [autoplay, setAutoplay] = useState(false);

  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | Sarees </title>
        <style>{`
        body {
          background-color: #fff !important;
        }

        @media (max-width: 992px) {
          .filter-sidebar {
            display: none
          }
        }
      `}</style>
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

        <style>{`
      body {
        font-family: "Poppins";
        color: #747d88;
        // background-color: #1d1c22;
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
h2, .h2 {
  font-size: 2.25rem;
  line-height: 1.25;
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
  font-size: 0.875rem;
  height: 2.875rem;
  line-height: 1.875rem;
  padding: 0.5rem 1.5rem;
  font-family: "Poppins";
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
      .btn {
        transition: all 0.3s;
        text-transform: uppercase;
        padding: 1.85rem 4.2rem;
        border-radius: 0;
        font-size: 1.4rem;
        font-weight: 700;
        font-family: Poppins, sans-serif;
        line-height: 1.429;
      }
      .btn-primary {
        border-color: #08c;
        background-color: #08c;
        color: #fff;
        box-shadow: none;
      }       
      form {
        margin-bottom: 3.5rem;
      }
      @media (min-width: 768px) {
        form, .form-footer {
            margin-bottom: 4rem;
        }
      }
      @media (min-width: 992px) {
        form, .form-footer {
            margin-bottom: 5rem;
        }
      }


      .product-default {
        color: #999;
        margin-bottom: 2rem;
    }
    
    .product-default a {
        color: inherit;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .product-default a:hover {
        color: #08c;
        text-decoration: none;
    }
    
    .product-default figure {
        margin-bottom: 1.6rem;
        position: relative;
    }
    
    .product-default figure img {
        transition: opacity 0.3s;
        height: auto;
        width: 100%;
    }
    
    .product-default figure img:last-child {
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }
    
    .product-default figure img:first-child {
        opacity: 1;
        position: relative;
    }
    
    .product-default .label-group {
        position: absolute;
        top: 0.8rem;
        left: 0.8rem;
    }
    
    .product-default .product-label {
        display: block;
        text-align: center;
        margin-bottom: 5px;
        text-transform: uppercase;
        padding: 5px 9px;
        color: #fff;
        font-weight: 600;
        font-size: 11px;
        line-height: 1;
        border-radius: 20px;
    }
    
    .product-default .product-label.label-hot {
        background-color: #62b959;
    }
    
    .product-default .product-label.label-sale {
        background-color: #e27c7c;
    }
    
    .product-default .product-details {
        display: flex;
        display: -ms-flexbox;
        flex-direction: column;
        -ms-flex-direction: column;
        align-items: center;
        -ms-flex-align: center;
        justify-content: center;
        -ms-flex-pack: center;
    }
    
    .product-default .category-list {
        font-weight: 400;
        font-size: 0.7rem;
        font-family: "Poppins", sans-serif;
        line-height: 1.7;
        opacity: 0.8;
        text-transform: uppercase;
    }
    
    .product-default .product-category {
        color: #999;
    }
    
    .product-default .product-title {
        max-width: 100%;
        font-weight: 400;
        font-size: 1rem;
        font-family: "Poppins", sans-serif;
        line-height: 1.35;
        letter-spacing: 0.005em;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .product-default .btn-quickview {
      display: inline-block;
      border: 1px solid #ddd;
      margin: 0 2px;
      width: 36px;
      height: 36px;
      font-size: 0.8rem;
      text-align: center;
      opacity: 0;
      transition: 0.65s;
      transform: translateX(-200%);
    }

    
.product-default:hover {
z-index: 2;
}

.product-default:hover figure {
box-shadow: 0 25px 35px -5px rgba(0, 0, 0, 0.1);
}

.product-default:hover figure img:first-child {
opacity: 0;
}

.product-default:hover figure img:last-child {
opacity: 1;
}

.old-price {
text-decoration: line-through;
font-size: 1rem;
letter-spacing: 0.005em;
color: #999;
margin-right: 3px;
font-family: Open Sans, sans-serif;
line-height: 1.5;
}

.product-price {
color: #222529;
font-size: 1rem;
line-height: 0.8;
font-family: Open Sans, sans-serif;
}

.price-box {
margin-bottom: 0;
font-weight: 600;
font-family: "Poppins", sans-serif;
line-height: 1;
}

.inner-quickview figure {
position: relative;
}

.inner-quickview figure .btn-quickview {
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: auto;
padding: 0.5rem;
color: #fff;
background-color: #08c;
font-size: 0.8rem;
font-weight: 400;
letter-spacing: 0.025em;
font-family: Poppins, sans-serif;
text-transform: uppercase;
visibility: hidden;
line-height: 2rem;
opacity: 0;
transform: none;
margin: 0;
border: none;
transition: 0.25s;
}

.inner-quickview figure .btn-quickview:hover {
opacity: 1;
}

.inner-quickview .product-details {
align-items: flex-start;
-ms-flex-align: start;
}

.inner-quickview .category-wrap {
display: flex;
display: -ms-flexbox;
justify-content: space-between;
-ms-flex-pack: justify;
align-items: center;
-ms-flex-align: center;
width: 100%;
}

.inner-quickview:hover .btn-quickview {
visibility: visible;
opacity: 0.85;
}

.inner-icon figure {
position: relative;
}
.product-category {
color: #1d2127;
margin-bottom: 2rem;
position: relative;
}
html {
// overflow-x: hidden;
// font-size: 62.5%;
// font-size-adjust: 100%;
// -ms-text-size-adjust: 100%;
// -webkit-text-size-adjust: 100%;
}
body {
color: #777;
background: #fff;
font-size: 1rem;
font-weight: 400;
line-height: 1.4;
font-family: "Poppins", sans-serif;
-moz-osx-font-smoothing: grayscale;
-webkit-font-smoothing: antialiased;
overflow-x: hidden;
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
h2, .h2 {
font-size: 3rem;
line-height: 1.5;
}
h3, .h3 {
font-size: 2.5rem;
line-height: 1.28;
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

a:hover, a:focus {
color: #08c;
text-decoration: none;
}
@media (min-width: 768px) {
h2, .h2 {
  font-size: 2.5rem;
}
}
@media (min-width: 992px) {
h2, .h2 {
  font-size: 3rem;
}
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
font-size: 1rem;
// color: #777;
// background: #e6e5e2;
// link-active-color: #fff;
line-height: 1.8rem;
// padding-top: 1px;
}

footer p {
color: inherit;
}
footer a {
color: inherit;
}
.sidebar-shop {
font-size: 0.8rem;
}
.sidebar-shop .widget-title {
margin: 0;
color: #313131;
font-size: 1rem;
font-weight: 600;
font-family: Poppins, sans-serif;
line-height: 1.4;
text-transform: uppercase;
}
.sidebar-shop .widget-body {
padding: 1.5rem 0;
}
.cat-list {
margin: 0;
padding: 0;
list-style: none;
}

.cat-list li {
margin-bottom: 1.4rem;
}

.cat-list li:last-child {
margin-bottom: 0;
}

.price-slider-wrapper {
padding-top: 2rem;
}

.filter-price-action {
margin-top: 1.7rem;
padding-bottom: 0.4rem;
}

.filter-price-action .btn {
padding: 2px 0.3em;
font-size: 0.7rem;
font-weight: 400;
height: 2rem
}

.filter-price-action .filter-price-text {
font-size: 0.7rem;
line-height: 2;
}
.sidebar-toggle {
position: fixed;
top: 20%;
left: 0;
width: 40px;
height: 40px;
transition: left 0.2s ease-in-out 0s;
border: #dcdcda solid 1px;
border-left-width: 0;
background: #fff;
font-size: 17px;
line-height: 38px;
text-align: center;
cursor: pointer;
z-index: 999;
margin-top: 50px;
}
@media (min-width: 992px) {
.sidebar-toggle {
  display: none;
}
}

@media (max-width: 991px) {
.mobile-sidebar {
    display: block !important; 
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 260px !important; 
    padding: 2rem;
    margin: 0;
    transform: translate(-260px);
    transition: transform 0.2s ease-in-out 0s;
    background-color: #fff;
    z-index: 9999;
    overflow-y: auto;
}
}
@media (max-width: 991px) {
  .mobile-sidebar {
      display: none !important; 
      
  }
  }
.widget-title {
margin: 0.5rem 0 1.3rem;
color: #000;
font-size: 1.8rem;
font-weight: 700;
line-height: 1.2;
}
body {
// line-height: 2rem;
}
.category-banner img, .category-banner-boxed img {
min-height: 34rem;
object-fit: cover;
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
      
      /* html {
          font-family: sans-serif;
          line-height: 1.15;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -ms-overflow-style: scrollbar;
          -webkit-tap-highlight-color: transparent;
      } */

      article, aside, figcaption, figure, header, hgroup, main, nav, section {
        display: block;
    }
    
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
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

a:hover {
  color: #0056b3;
  text-decoration: underline;
}


figure {
  margin: 0 0 1rem;
}

img {
  vertical-align: middle;
  border-style: none;
}

svg {
  overflow: hidden;
  vertical-align: middle;
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

.h2, h2 {
  font-size: 2rem;
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
.col-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

@media (min-width: 576px) {
  .col-sm-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
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
  .col-lg-9 {
    -ms-flex: 0 0 75%;
    flex: 0 0 75%;
    
  }
  .order-lg-first {
    -ms-flex-order: -1;
    order: -1;
  }
  .order-lg-last {
    -ms-flex-order: 13;
    order: 13;
  }
}

@media (min-width: 992px){
  .col-lg-9 {
      -ms-flex: 0 0 75%;
      flex: 0 0 75%;
      max-width: 75%;
    }
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
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
.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
.flex-wrap {
  -ms-flex-wrap: wrap !important;
  flex-wrap: wrap !important;
}
.justify-content-between {
    -ms-flex-pack: justify !important;
    justify-content: space-between !important;
}
.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}
.position-relative {
  position: relative !important;
}
.mb-0, .my-0 {
  margin-bottom: 0 !important;
}
.mb-3, .my-3 {
  margin-bottom: 1rem !important;
}


      
        `}</style>

        <style>{`
          a:active {
            color: blue;
          }
        `}</style>
        {/* <link href="/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" /> */}
        {/* <link href="/assets/css/theme.min.css" rel="stylesheet" /> */}
        {/* <link rel="stylesheet" href="/assets/porto.css" /> */}
        {/* <link rel="stylesheet" href="/assets/style.css" /> */}
      </Helmet>

      {/*<section
        className="
        after-head
        top-block-page
        with-back
        section-white-text
      "
      >
        <div
          className="overflow-back "
          // style={{ backgroundImage: "url(/images/category-bg.png)" }}
        >
          <div
            className="overflow-back cover-image mw-100"
            data-background="images/category-bg.png"
            style={{
              backgroundImage: `url(images/category-bg.jpg)`,
            }}
          ></div>
          <div className="overflow-back bg-body-back opacity-70"></div>
        </div>
        <div className="content-offs-stick my-5 container">
          <div className="section-solid">
            <div className="z-index-4 position-relative">
              <h1 className="section-title">Women Clothing</h1>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/">
                    Home
                  </a>
                  <span className="mx-2">\</span>
                  <a className="content-link" href="/veggies/shop">
                    WOMEN
                  </a>
                  <span className="mx-2">\</span>
                  <span>CLOTHING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </section>*/}

      <section
        className=""
        style={{
          backgroundImage: "url('assets/images/parts/curve.png)",
          top: "70px",
          position: "relative",
        }}
      >
        <div className="category-banner position-relative">
          <figure className="mb-0">
            <img
              src="/images/shop.webp"
              alt="background"
              style={{ objectFit: "contain", minHeight: "0rem" }}
            />
          </figure>

          {/* <div className="container justify-content-between position-absolute d-flex">
            <div
              className="banner-content banner-layer-left"
              data-animation-name="fadeIn"
              data-animation-duration="1200"
              data-animation-delay="200"
            >
              <h2 className="text-white font3 font-weight-normal">DUSHEERA</h2>
              <h3 className="text-white mb-0 text-left text-uppercase">SALE</h3>
            </div>

            <div
              className="banner-content banner-layer-right"
              data-animation-name="fadeIn"
              data-animation-duration="1200"
              data-animation-delay="400"
            >
              <h4
                className="
                  text-white
                  pl-2
                  font-weight-light
                  mb-0
                  text-left text-uppercase
                "
                style={{ fontSize: "16px" }}
              >
                BUY 1
              </h4>
              <h3
                className="
                  text-white
                  mb-0
                  text-sale
                  m-l-n-xs
                  text-left text-uppercase
                "
              >
                GET 1<small className="d-inline-block text-center"></small>
              </h3>
            </div>
          </div> */}
        </div>
      </section>

      <div className="container mb-3" style={{ marginTop: "90px" }}>
        <div className="row">
          <div className="col-lg-9">
            {/* <nav className="toolbox">
              <div className="toolbox-left">
                <div className="toolbox-item toolbox-sort">
                  <label>Sort By:</label>
                  <div className="select-custom">
                    <select name="orderby" className="form-control">
                      <option value="menu_order" selected="selected">
                        Default sorting
                      </option>
                      <option value="popularity">Sort by popularity</option>
                      <option value="rating">Sort by average rating</option>
                      <option value="date">Sort by newness</option>
                      <option value="price">Sort by price: low to high</option>
                      <option value="price-desc">
                        Sort by price: high to low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="toolbox-right">
                <div className="toolbox-item toolbox-show">
                  <label>Show:</label>

                  <div className="select-custom">
                    <select name="count" className="form-control">
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                    </select>
                  </div>
                </div>

                <div className="toolbox-item layout-modes">
                  <a
                    href="category.html"
                    className="layout-btn btn-grid active"
                    title="Grid"
                  >
                    <i className="icon-mode-grid"></i>
                  </a>
                  <a
                    href="category-list.html"
                    className="layout-btn btn-list"
                    title="List"
                  >
                    <i className="icon-mode-list"></i>
                  </a>
                </div>
              </div>
            </nav> */}
            <div className="sidebar-toggle" onClick={handleToggle}>
              <TuneIcon
                onClick={handleToggle}
                style={{ height: "0.6em", width: "0.6em" }}
              />
            </div>

            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={backDropOpen}
              // onClick={handleClose}
            >
              <Paper style={{ width: "50%" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "3%",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        lineHeight: "unset",
                        marginBottom: "unset",
                      }}
                    >
                      FILTERS
                    </h3>
                    <CloseIcon
                      style={{ marginTop: "3px", cursor: "pointer" }}
                      onClick={handleClose}
                    />
                  </div>

                  <Accordion
                    expanded={expanded === "categories"}
                    onChange={handleChange("categories")}
                    style={{ margin: "0px" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ margin: "0px" }}
                    >
                      <Typography
                        className="widget-title"
                        style={{ margin: "0px", fontSize: "0.8rem" }}
                      >
                        CATEGORIES
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="collapse show" id="widget-body-2">
                        <div className="widget-body">
                          <ul className="cat-list">
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("georgettesaree")
                                }
                              >
                                GEORGETTE SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("chiffonsaree")
                                }
                              >
                                CHIFFON SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("dolaprintsaree")
                                }
                              >
                                DOLA PRINT SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("dolapartusaree")
                                }
                              >
                                DOLA PARTU SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("dotnetsaree")
                                }
                              >
                                DOT NET SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("cottonsaree")
                                }
                              >
                                COTTON SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("silksaree")
                                }
                              >
                                SILK SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("halfsaree")
                                }
                              >
                                HALF SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("pattusaree")
                                }
                              >
                                PATTU SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() =>
                                  handleCategoryFilter("crepesaree")
                                }
                              >
                                CREPE SAREES
                              </div>
                            </li>
                            {/* <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                              >
                                WEDDING SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                              >
                                BANDHANI SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                              >
                                DESIGNER SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                              >
                                CATALOGUE SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                              >
                                HEAVY WORK SAREES
                              </div>
                            </li>
                            <li>
                              <div
                                style={{
                                  cursor: "pointer",
                                  fontSize: "0.7rem",
                                }}
                              >
                                FANCY SAREES{" "}
                              </div>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "price"}
                    onChange={handleChange("price")}
                    style={{ margin: "0px" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                      style={{ margin: "0px", fontSize: "1.3rem" }}
                    >
                      <Typography
                        className="widget-title"
                        style={{ margin: "0px", fontSize: "0.8rem" }}
                      >
                        PRICE
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                    // style={{ padding: "0px 12px 16px", height: "140px" }}
                    >
                      <div className="collapse show" id="widget-body-3">
                        <div className="widget-body" style={{ padding: "0" }}>
                          <form action="#">
                            <div className="price-slider-wrapper">
                              {/* <div
                        id="price-slider"
                        className="noUi-target noUi-ltr noUi-horizontal"
                      ></div> */}
                              <Slider
                                size="small"
                                defaultValue={[minValue, maxValue]}
                                // aria-label="Default"
                                valueLabelDisplay="auto"
                                min={300}
                                max={20000}
                                step={200}
                                style={{ padding: "0" }}
                                onChange={(e, value) => {
                                  setMinValue(value[0]);
                                  setMaxValue(value[1]);
                                }}
                              />
                            </div>

                            <div
                              className="
                              filter-price-action
                              d-flex
                              align-items-center
                              justify-content-between
                              flex-wrap
                            "
                            >
                              <Button
                                // type="submit"
                                variant="contained"
                                style={{ borderRadius: "3px" }}
                                className="btn btn-primary"
                                onClick={handlePriceFilter}
                              >
                                Filter
                              </Button>

                              <div className="filter-price-text">
                                Price:
                                <span id="filter-price-range">
                                  {" "}
                                  Rs.{minValue} - Rs.{maxValue}
                                </span>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  {/*  <Accordion
                    expanded={expanded === "size"}
                    onChange={handleChange("size")}
                    style={{ margin: "0px" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ margin: "0px" }}
                    >
                      <Typography
                        className="widget-title"
                        style={{ margin: "0px", fontSize: "1.3rem" }}
                      >
                        SIZE
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="collapse show" id="widget-body-4">
                        <div className="widget-body">
                          <ul className="cat-list">
                            <li>
                              <div
                                onClick={() => handleSizeFilter("S")}
                                // style={{ cursor: "pointer" }}
                              >
                                Small
                              </div>
                            </li>
                            <li>
                              <div
                                onClick={() => handleSizeFilter("M")}
                                // style={{ cursor: "pointer" }}
                              >
                                Medium
                              </div>
                            </li>
                            <li>
                              <div
                                onClick={() => handleSizeFilter("L")}
                                // style={{ cursor: "pointer" }}
                              >
                                Large
                              </div>
                            </li>
                            <li>
                              <div
                                onClick={() => handleSizeFilter("XL")}
                                // style={{ cursor: "pointer" }}
                              >
                                Extra Large
                              </div>
                            </li>
                            <li>
                              <div
                                onClick={() => handleSizeFilter("XXL")}
                                // style={{ cursor: "pointer" }}
                              >
                                Double Extra Large
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "color"}
                    onChange={handleChange("color")}
                    style={{ margin: "0px", fontSize: "1.3rem" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      style={{ margin: "0px" }}
                    >
                      <Typography
                        className="widget-title"
                        style={{ margin: "0px", fontSize: "1.3rem" }}
                      >
                        COLOR
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="collapse show" id="widget-body-6">
                        <div className="widget-body">
                          <ul
                            className="config-swatch-list"
                            style={{ margin: "0", fontSize: "1.3rem" }}
                          >
                            <li className="active" style={{ display: "flex" }}>
                              <a href="#/" style={{ backgroundColor: "#000" }}>
                                {" "}
                              </a>
                              <span>Black</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#0188cc" }}
                              >
                                {" "}
                              </a>
                              <span>Blue</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#81d742" }}
                              >
                                {" "}
                              </a>
                              <span>Green</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#6085a5" }}
                              >
                                {" "}
                              </a>
                              <span>Indigo</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#ab6e6e" }}
                              >
                                {" "}
                              </a>
                              <span>Red</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#ddb373" }}
                              >
                                {" "}
                              </a>
                              <span>Brown</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#6b97bf" }}
                              >
                                {" "}
                              </a>
                              <span>Light-Blue</span>
                            </li>
                            <li style={{ display: "flex" }}>
                              <a
                                href="#/"
                                style={{ backgroundColor: "#eded68" }}
                              >
                                {" "}
                              </a>
                              <span>Yellow</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion> */}
                </div>
              </Paper>
            </Backdrop>

            {!loading ? (
              <div className="row" id="scrollableDiv">
                {isEmpty ? (
                  <h3 style={{ textAlign: "center", width: "100%" }}>
                    Sorry! No Items for selected Filter{" "}
                  </h3>
                ) : (
                  ""
                )}
                {/* displayProds &&
                  displayProds.map((shirt) => <Listing shirt={shirt} />) */}
                {/* <Cards items={items} fetchMoreData={fetchMoreData} /> */}
                {/*
                  <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading ... </h4>}
                    className="col-6 col-sm-4"
                    // endMessage={<h3>HTank you</h3>}
                  >
                  </InfiniteScroll>
                */}
                {/* <div
                  className="col-6 col-sm-4"
                  // href={`/product?id=${clothingId}`}
                >
                  <div className="product-default inner-quickview inner-icon">
                    <figure>
                      <a href={`/product?id=${"clothingId"}`}>
                        <img
                          src="/images/201001.jpg"
                          alt=""
                          style={{ borderRadius: "5px" }}
                        />
                      </a>

                      <div className="label-group">
                        <div
                          className="product-label label-hot"
                          // style={{ backgroundColor: "#62b959" }}
                        >
                          -20%
                        </div>
                      </div>
                      <a
                        href={`/product?id=${"clothingId"}`}
                        className="btn-quickview"
                        title="Quick View"
                        style={{ borderRadius: "0px 0px 5px 5px" }}
                      >
                        Quick View
                      </a>
                    </figure>
                    <div className="product-details">
                      <div className="category-wrap">
                        <div className="category-list">
                          <a href="#/" className="product-category">
                            {"categoryType"}
                          </a>
                        </div>
                        <a href="#/" className="btn-icon-wish">
                          <FavoriteBorderIcon />
                        </a>
                      </div>
                      <h2 className="product-title">
                        <a href={`/product?id=${"clothingId"}`}>{"name"}</a>
                      </h2>
                      <div className="price-box">
                        <span className="old-price">Rs.{500}</span>
                        <span
                          className="product-price"
                          style={{
                            fontWeight: "800",
                            fontSize: "1.5rem",
                          }}
                        >
                          Rs.100
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {displayProds &&
                  displayProds.map((shirt) => (
                    <div
                      className="col-6 col-sm-4"
                      key={shirt.clothingId}
                      // href={`/product?id=${clothingId}`}
                    >
                      <div className="product-default inner-quickview inner-icon">
                        <figure>
                          {shirt.in_stock ? (
                            <Slide
                              autoplay={true}
                              transitionDuration={300}
                              arrows={true}
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
                                    fontSize="medium"
                                    style={{ height: "0.8em", width: "0.8em" }}
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
                                    fontSize="medium"
                                    style={{ height: "0.8em", width: "0.8em" }}
                                  />
                                </div>
                              }
                            >
                              {shirt.images.map((img) => (
                                <a href={`/saree?id=${shirt.clothingId}`}>
                                  <img
                                    src={img}
                                    alt=""
                                    style={{ borderRadius: "5px" }}
                                  />
                                </a>
                              ))}
                            </Slide>
                          ) : (
                            <div>
                              <img
                                src={shirt.img}
                                alt=""
                                style={{ borderRadius: "5px" }}
                              />
                            </div>
                          )}
                          {shirt.categoryType === "georgettesaree" ? (
                            <div
                              className="label-group"
                              style={{ right: "0.8rem", left: "unset" }}
                            >
                              <div
                                className="product-label label-sale"
                                // style={{ backgroundColor: "#62b959" }}
                              >
                                BUY 1
                              </div>
                              <div
                                className="product-label label-hot"
                                // style={{ backgroundColor: "#62b959" }}
                              >
                                GET 1 FREE
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {shirt.in_stock ? (
                            <a
                              href={`/saree?id=${shirt.clothingId}`}
                              className="btn-quickview"
                              title="Quick View"
                              style={{ borderRadius: "0px 0px 5px 5px" }}
                            >
                              Quick View
                            </a>
                          ) : (
                            <div
                              className="btn-quickview"
                              title="Quick View"
                              style={{
                                borderRadius: "0px 0px 5px 5px",
                                background: "red",
                              }}
                            >
                              OUT OF STOCK
                            </div>
                          )}
                        </figure>
                        <div className="product-details">
                          <div className="category-wrap">
                            <div className="category-list">
                              <a href="#/" className="product-category">
                                {/* shirt.categoryType */}
                              </a>
                            </div>
                            {/* <a href="#/" className="btn-icon-wish">
                              <FavoriteBorderIcon />
                            </a> */}
                          </div>
                          <h2 className="product-title">
                            <a
                              href={`/product?id=${shirt.clothingId}`}
                              style={{ color: "black", fontSize: "16px" }}
                            >
                              {shirt.name}
                            </a>
                          </h2>
                          <div className="price-box">
                            <span className="old-price">
                              Rs.{shirt.actual_price}
                            </span>
                            <span
                              className="product-price"
                              // style={{
                              //   fontWeight: "800",
                              //   fontSize: "1.5rem",
                              // }}
                            >
                              Rs.{shirt.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <Snackbar
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
                    Item Added to Cart
                  </Alert>
                )}
              </Snackbar> */}
              </div>
            ) : (
              <Loading />
            )}
          </div>
          <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar filter-sidebar">
            <Accordion
              expanded={expanded === "categories"}
              onChange={handleChange("categories")}
              style={{ margin: "0px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="widget-title">SAREES</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="collapse show" id="widget-body-2">
                  <div className="widget-body">
                    <ul className="cat-list">
                      <li>
                        <a
                          href="#"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleCategoryFilter("georgettesaree")}
                        >
                          GEORGETTE SAREES
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleCategoryFilter("chiffonsaree")}
                        >
                          CHIFFON SAREES
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleCategoryFilter("dolaprintsaree")}
                        >
                          DOLA PRINT SAREES
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleCategoryFilter("dolapartusaree")}
                        >
                          DOLA PARTU SAREES
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleCategoryFilter("dotnetsaree")}
                        >
                          DOT NET SAREES
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          style={{ textDecoration: "none" }}
                          onClick={() => handleCategoryFilter("cottonsaree")}
                        >
                          COTTON SAREES
                        </a>
                      </li>
                      <li>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCategoryFilter("silksaree")}
                        >
                          SILK SAREES
                        </div>
                      </li>
                      <li>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCategoryFilter("halfsaree")}
                        >
                          HALF SAREES
                        </div>
                      </li>
                      <li>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCategoryFilter("pattusaree")}
                        >
                          PATTU SAREES
                        </div>
                      </li>
                      <li>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCategoryFilter("crepesaree")}
                        >
                          CREPE SAREES
                        </div>
                      </li>
                      {/* <li>
                        <div style={{ cursor: "pointer" }}>WEDDING SAREES</div>
                      </li>
                      <li>
                        <div style={{ cursor: "pointer" }}>BANDHANI SAREES</div>
                      </li>
                      <li>
                        <div style={{ cursor: "pointer" }}>DESIGNER SAREES</div>
                      </li>
                      <li>
                        <div style={{ cursor: "pointer" }}>
                          CATALOGUE SAREES
                        </div>
                      </li>
                      <li>
                        <div style={{ cursor: "pointer" }}>
                          HEAVY WORK SAREES
                        </div>
                      </li>
                      <li>
                        <div style={{ cursor: "pointer" }}>FANCY SAREES </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "price"}
              onChange={handleChange("price")}
              style={{ margin: "0px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className="widget-title">PRICE</Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ padding: "0px 12px 16px", height: "140px" }}
              >
                <div className="collapse show" id="widget-body-3">
                  <div className="widget-body" style={{ padding: "0" }}>
                    <form action="#">
                      <div className="price-slider-wrapper">
                        {/* <div
                      id="price-slider"
                      className="noUi-target noUi-ltr noUi-horizontal"
                    ></div> */}
                        <Slider
                          // size="small"
                          defaultValue={[minValue, maxValue]}
                          // aria-label="Default"
                          valueLabelDisplay="auto"
                          min={400}
                          max={3000}
                          step={200}
                          onChange={(e, value) => {
                            setMinValue(value[0]);
                            setMaxValue(value[1]);
                          }}
                        />
                      </div>

                      <div
                        className="
                        filter-price-action
                        d-flex
                        align-items-center
                        justify-content-between
                        flex-wrap
                      "
                      >
                        <Button
                          // type="submit"
                          variant="contained"
                          style={{ borderRadius: "3px" }}
                          className="btn btn-primary"
                          onClick={handlePriceFilter}
                        >
                          Filter
                        </Button>

                        <div className="filter-price-text">
                          Price:
                          <span id="filter-price-range">
                            {" "}
                            Rs.{minValue} - Rs.{maxValue}
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/*  <Accordion
              expanded={expanded === "size"}
              onChange={handleChange("size")}
              style={{ margin: "0px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="widget-title">DRESSES</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="collapse show" id="widget-body-4">
                  <div className="widget-body">
                    <ul className="cat-list">
                      <li>
                        <div
                          // onClick={() => handleSizeFilter("S")}
                          style={{ cursor: "pointer" }}
                        >
                          CHUDIHARS
                        </div>
                      </li>
                      <li>
                        <div
                          // onClick={() => handleSizeFilter("M")}
                          style={{ cursor: "pointer" }}
                        >
                          Medium
                        </div>
                      </li>
                      <li>
                        <div
                          // onClick={() => handleSizeFilter("L")}
                          style={{ cursor: "pointer" }}
                        >
                          Large
                        </div>
                      </li>
                      <li>
                        <div
                          // onClick={() => handleSizeFilter("XL")}
                          style={{ cursor: "pointer" }}
                        >
                          Extra Large
                        </div>
                      </li>
                      <li>
                        <div
                          // onClick={() => handleSizeFilter("XXL")}
                          style={{ cursor: "pointer" }}
                        >
                          Double Extra Large
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion> */}
            {/* <Accordion
              expanded={expanded === "size"}
              onChange={handleChange("size")}
              style={{ margin: "0px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="widget-title">SIZE</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="collapse show" id="widget-body-4">
                  <div className="widget-body">
                    <ul className="cat-list">
                      <li>
                        <div
                          onClick={() => handleSizeFilter("S")}
                          style={{ cursor: "pointer" }}
                        >
                          Small
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleSizeFilter("M")}
                          style={{ cursor: "pointer" }}
                        >
                          Medium
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleSizeFilter("L")}
                          style={{ cursor: "pointer" }}
                        >
                          Large
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleSizeFilter("XL")}
                          style={{ cursor: "pointer" }}
                        >
                          Extra Large
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => handleSizeFilter("XXL")}
                          style={{ cursor: "pointer" }}
                        >
                          Double Extra Large
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "color"}
              onChange={handleChange("color")}
              style={{ margin: "0px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="widget-title">COLOR</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="collapse show" id="widget-body-6">
                  <div className="widget-body">
                    <ul
                      className="config-swatch-list"
                      style={{ margin: "0", fontSize: "1.3rem" }}
                    >
                      <li className="active" style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#000" }}>
                          {" "}
                        </a>
                        <span>Black</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#0188cc" }}>
                          {" "}
                        </a>
                        <span>Blue</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#81d742" }}>
                          {" "}
                        </a>
                        <span>Green</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#6085a5" }}>
                          {" "}
                        </a>
                        <span>Indigo</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#ab6e6e" }}>
                          {" "}
                        </a>
                        <span>Red</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#ddb373" }}>
                          {" "}
                        </a>
                        <span>Brown</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#6b97bf" }}>
                          {" "}
                        </a>
                        <span>Light-Blue</span>
                      </li>
                      <li style={{ display: "flex" }}>
                        <a href="#/" style={{ backgroundColor: "#eded68" }}>
                          {" "}
                        </a>
                        <span>Yellow</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion> */}
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
};

function Cards({ items, fetchMoreData }) {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollableTarget="scrollableDiv"
    >
      {items &&
        items.map((shirt) => (
          <React.Fragment>
            {shirt && (
              <div
                className="col-6 col-sm-4"
                key={shirt.clothingId}
                // href={`/product?id=${clothingId}`}
              >
                <div className="product-default inner-quickview inner-icon">
                  <figure>
                    {shirt.in_stock ? (
                      <a href={`/product?id=${shirt.clothingId}`}>
                        <img
                          src={shirt.img}
                          alt=""
                          style={{ borderRadius: "5px" }}
                        />
                      </a>
                    ) : (
                      <div>
                        <img
                          src={shirt.img}
                          alt=""
                          style={{ borderRadius: "5px" }}
                        />
                      </div>
                    )}
                    <div className="label-group">
                      <div
                        className="product-label label-hot"
                        // style={{ backgroundColor: "#62b959" }}
                      >
                        -20%
                      </div>
                    </div>
                    {shirt.in_stock ? (
                      <a
                        href={`/product?id=${shirt.clothingId}`}
                        className="btn-quickview"
                        title="Quick View"
                        style={{ borderRadius: "0px 0px 5px 5px" }}
                      >
                        Quick View
                      </a>
                    ) : (
                      <div
                        className="btn-quickview"
                        title="Quick View"
                        style={{
                          borderRadius: "0px 0px 5px 5px",
                          background: "red",
                        }}
                      >
                        OUT OF STOCK
                      </div>
                    )}
                  </figure>
                  <div className="product-details">
                    <div className="category-wrap">
                      <div className="category-list">
                        <a href="#/" className="product-category">
                          {shirt.categoryType}
                        </a>
                      </div>
                      <a href="#/" className="btn-icon-wish">
                        <FavoriteBorderIcon />
                      </a>
                    </div>
                    <h2 className="product-title">
                      <a href={`/product?id=${shirt.clothingId}`}>
                        {shirt.name}
                      </a>
                    </h2>
                    <div className="price-box">
                      <span className="old-price">Rs.{shirt.actual_price}</span>
                      <span
                        className="product-price"
                        style={{
                          fontWeight: "800",
                          fontSize: "1.5rem",
                        }}
                      >
                        Rs.{shirt.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
    </InfiniteScroll>
  );
}

export default Shop;
