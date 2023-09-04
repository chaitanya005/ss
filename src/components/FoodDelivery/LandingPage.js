import React from "react";
import { Helmet } from "react-helmet";
import FoodHome from "./Home";
import Offers from "./Offers";
import PopularBrands from "./PopularBrands";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Helmet>
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

small {
  font-size: 80%;
}

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
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

.h2, h2 {
  font-size: 2rem;
}

.h4, h4 {
  font-size: 1.5rem;
}

.h5, h5 {
  font-size: 1.25rem;
}

.h6, h6 {
  font-size: 1rem;
}

.small, small {
  font-size: 80%;
  font-weight: 400;
}

.img-fluid {
  max-width: 100%;
  height: auto;
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

.col-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

@media (min-width: 576px) {
  .col-sm-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (min-width: 768px) {
  .col-md-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
}

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

.order-lg-first {
  -ms-flex-order: -1;
  order: -1;
}

.order-lg-last {
  -ms-flex-order: 13;
  order: 13;
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


.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.badge:empty {
  display: none;
}

.badge-success {
  color: #fff;
  background-color: #28a745;
}

.bg-white {
  background-color: #fff !important;
}

.rounded-sm {
  border-radius: 0.2rem !important;
}

.rounded {
  border-radius: 0.25rem !important;
}

.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
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
 
 .float-right {
  float: right !important;
}

.overflow-hidden {
  overflow: hidden !important;
}

.position-relative {
  position: relative !important;
}

.position-absolute {
  position: absolute !important;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.h-100 {
  height: 100% !important;
}

.mt-0, .my-0 {
  margin-top: 0 !important;
}

.mb-1, .my-1 {
  margin-bottom: 0.25rem !important;
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

.pt-1, .py-1 {
  padding-top: 0.25rem !important;
}

.pb-1, .py-1 {
  padding-bottom: 0.25rem !important;
}

.pr-2, .px-2 {
  padding-right: 0.5rem !important;
}

.pb-2, .py-2 {
  padding-bottom: 0.5rem !important;
}

.pl-2, .px-2 {
  padding-left: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
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

.text-danger {
  color: #dc3545 !important;
}


.text-dark {
  color: #343a40 !important;
}
`}
        </style>
        <style>
          {`
        body {
          font-family: "sans-serif";
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

h6, .h6 {
  font-size: 1rem;
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

.text-bittersweet {
  color: #ff736a !important;
}


.bg-light-green {
  background-color: #98c869 !important;
}


.bg-vegetables-pattern {
  background-image: url("/assets/images/parts/vegetables-pattern.png");
  background-position: 0 0;
  background-repeat: repeat;
}

.bg-vegetables-pattern-white {
  background-image: url("/assets/images/parts/vegetables-pattern-white.png");
  background-position: 0 0;
  background-repeat: repeat;
}

.opacity-3 {
  opacity: 0.03 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=3)" !important;
  filter: alpha(opacity=3) !important;
}

.opacity-10 {
  opacity: 0.1 !important;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)" !important;
  filter: alpha(opacity=10) !important;
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

.curve-after-40:after {
  background-position: 40% 0;
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

.section-footer {
  margin-top: 4rem;
}

.section-footer .btn:last-child:first-child {
  min-width: 9rem;
}


.section-title {
  color: #fff;
  // font-family: "Rubik";
}

.section-text {
  color: #fff;
  margin-top: 0;
  font-size: 1.125rem;
  font-weight: 500;
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


@media (min-width: 768px) {
  .section-head.left {
      -webkit-box-orient: horizontal;
      -moz-box-orient: horizontal;
      -o-box-orient: horizontal;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: start;
      -moz-box-pack: start;
      -o-box-pack: start;
      -ms-flex-pack: start;
      -webkit-justify-content: flex-start;
      justify-content: flex-start;
      text-align: left;
  }

  .section-head.left .section-icon {
      margin: auto 1.5rem auto 0;
  } 
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

.btn-wide {
  min-width: 9rem;
}


header {
  z-index: 30;
  position: relative;
  // font-family: "Rubik";
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

.header-horizontal {
  width: 100%;
  color: #fff;
}

.header-horizontal + .after-head .content-offs {
  padding-top: 5rem;
}


.header-over {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: transparent;
}


.header-view-side + .after-head .content-offs {
  padding-top: 8.6rem;
}


@media (min-width: 992px) {
  .header-view-side + .after-head .content-offs {
    padding-top: 13rem;
  }
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

.slick-slide {
  outline: 0 none;
}

.slick-top-fix, .slick-top-full, .slick-top-thumb {
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

.slick-top-fix {
  min-height: 45rem;
}

.slick-view-banner {
  width: 100%;
  position: relative;
}

.slick-view-banner, .slick-view-banner .slick-slides, .slick-view-banner .slick-list {
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
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  max-width: 100%;
}

.slick-view-banner .slick-slides {
  position: relative;
  z-index: 1;
}

.slick-view-banner .slick-slide {
  height: auto;
  float: none;
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

.entity-subtitle {
  color: #ffb524;
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

.entity-banner .entity-title + .entity-subtitle {
  margin-top: -1rem;
} `}
        </style>
      </Helmet>
      <FoodHome />
      <Offers />
      <PopularBrands />
    </React.Fragment>
  );
};

export default LandingPage;
