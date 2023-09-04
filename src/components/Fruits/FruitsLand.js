import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fruits from "./Fruits";
// import { withStyles, makeStyles } from '@material-ui/core/styles';
import DryFruits from "./DryFruits";
// import Tooltip from '@material-ui/core/Tooltip';

/* const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
} */

const FruitsLand = (req, res) => {
  const color = "#FFBAB5";

  const [state, setState] = React.useState({
    dryFruits: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // console.log(state.dryFruits);

  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | Fruits & Dry Fruits</title>
        <link rel="preload" as="image" href="/images/svg/dryFruitLand.svg" />
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

.col {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
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

  .order-lg-first {
    -ms-flex-order: -1;
    order: -1;
}

.order-lg-last {
    -ms-flex-order: 13;
    order: 13;
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

.bg-white {
  background-color: #fff !important;
}

.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
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

.justify-content-center {
  -ms-flex-pack: center !important;
  justify-content: center !important;
}

@media (min-width: 992px) {
  .align-items-lg-center {
    -ms-flex-align: center !important;
    align-items: center !important;
  }
}

.position-relative {
  position: relative !important;
}

.mw-100 {
  max-width: 100% !important;
}

.mt-4, .my-4 {
  margin-top: 1.5rem !important;
}

.mt-5, .my-5 {
  margin-top: 3rem !important;
}

.pt-0, .py-0 {
  padding-top: 0 !important;
}

.m-auto {
  margin: auto !important;
}

.mt-auto, .my-auto {
  margin-top: auto !important;
}

.mb-auto, .my-auto {
  margin-bottom: auto !important;
}

@media (min-width: 992px) {
  .mr-lg-5, .mx-lg-5 {
    margin-right: 3rem !important;
  }

  .m-lg-auto {
    margin: auto !important;
  }

  .mt-lg-auto, .my-lg-auto {
    margin-top: auto !important;
  }

  .mb-lg-auto, .my-lg-auto {
    margin-bottom: auto !important;
  }
}

.text-center {
  text-align: center !important;
}

@media (min-width: 992px) {
  .text-lg-left {
    text-align: left !important;
  }
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
      
      .flex-0 {
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          -o-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 0 0 auto !important;
          -ms-flex: 0 0 auto !important;
          flex: 0 0 auto !important;
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

.text-light-green {
  color: #98c869 !important;
}

.bg-body-back {
  background-color: #343a40 !important;
}

.bg-pink {
  background-color: #ff6a8e !important;
}

.bg-dark-lime-green {
  background-color: #058203 !important;
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

.opacity-50 {
  opacity: 0.5 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)" !important;
  filter: alpha(opacity=50) !important;
}

.opacity-70 {
  opacity: 0.7 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)" !important;
  filter: alpha(opacity=70) !important;
}

.z-index-2 {
  z-index: 2;
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

.curve-before-0:before {
  background-position: 0% 100%;
}

.curve-before-80:before {
  background-position: 80% 100%;
}

.curve-after-80:after {
  background-position: 80% 0;
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

.section-head, .section-subhead {
  margin-bottom: 4rem;
}

.section-head .section-icon {
  font-size: 2.75rem;
}

@media (min-width: 768px) {
  .section-head:not(.container), .section-footer:not(.container) {
    max-width: 640px;
  }
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

.section-head {
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
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.section-head .section-icon {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin: 0 auto 1rem;
  line-height: 1;
}

.section-head .section-head-content {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  margin: auto 0;
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

label {
  font-size: 1rem;
  font-weight: 600;
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

.btn-wide {
  min-width: 9rem;
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

.entity-bg, .entity-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.entity-bg {
  overflow: hidden;
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

.entity-block > .overflow-back, .entity-inline-block > .overflow-back, .entity-block > .entity-bg, .entity-inline-block > .entity-bg {
  border-radius: 0.75rem;
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

.entity-banner {
  height: 100%;
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
}

.entity-banner .entity-content {
  padding: 0;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
}

.entity-banner .entity-content.container {
  padding-left: 1rem;
  padding-right: 1rem;
}

.entity-banner .entity-title, .entity-banner .entity-subtitle {
  font-weight: 700;
  margin-bottom: 1.5rem;
  // font-family: "Rubik";
}

.entity-slim-banner {
  position: relative;
  padding: 6rem 0;
}

.entity-slim-banner, .entity-slim-banner .entity-title {
  color: #fff;
}

.entity-slim-banner .entity-title {
  font-weight: 600;
}

`}
        </style>
      </Helmet>
      <section className="white-curve-after after-head section-white-text">
        <div
          className="section-white-text entity-banner content-offs section-solid justify-content-center bg-pink"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <div className="container text-center text-lg-left flex-0 entity-content">
            <div className="my-auto position-relative align-items-lg-center flex-0 row">
              <div className="full-block">
                <div className="section-back-text">Dry Fruits</div>
              </div>
              <div className="m-lg-auto d-flex z-index-2 position-relative col">
                <img
                  className="m-auto col-auto mw-100"
                  src="/images/svg/dryFruitLand.svg"
                  alt=""
                />
              </div>
              <div className="col-lg-5 mr-lg-5 mt-5 my-lg-auto order-lg-first z-index-4 position-relative">
                <h2 className="h1 entity-title">
                  Fresh Dry Fruits<span className="text-light-green"></span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className=" white-curve-before
        curve-before-0
        white-curve-after
        curve-after-80
        entity-slim-banner
        text-center text-lg-left
        with-back
        section-white-text
        "
      >
        <div
          className="overflow-back cover-image"
          //   data-background="/assets/images/content/x/background-citric-citrus-1549040.jpg"
          style={{
            backgroundImage:
              "url(/assets/images/content/x/background-citric-citrus-1549040.jpg)",
          }}
        ></div>

        <div className="overflow-back bg-dark-lime-green opacity-50"></div>

        <div className="section-head" style={{ marginBottom: "0rem" }}>
          <div className="section-icon">
            <span
              className="svg-fill-white svg-content"
              //   data-svg="/assets/images/svg/title-avocado.svg"
            ></span>
          </div>
          <div className="section-head-content">
            <h2 className="section-title">Healthy Products</h2>
            <Typography component="div">
              <Grid
                component="label"
                container
                alignItems="center"
                spacing={1}
                style={{ justifyContent: "center" }}
              >
                <Grid item>Fruits</Grid>
                <Grid item>
                  <Switch
                    checked={state.dryFruits}
                    onChange={handleChange}
                    name="dryFruits"
                    size="medium"
                  />
                </Grid>
                <Grid item>Dry Fruits</Grid>
              </Grid>
            </Typography>
          </div>
        </div>
        {state.dryFruits ? <DryFruits /> : <Fruits />}
        {/* <div className="section-footer">
          <a className="btn btn-theme" href="#">
            view more&nbsp;&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
          </a>
        </div> */}
        <br />
      </section>
    </React.Fragment>
  );
};

export default FruitsLand;
