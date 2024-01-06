import React from "react";
import { Helmet } from "react-helmet";

const Error = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | 404 Found</title>
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

.container {
width: 100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
}

.mw-100 {
  max-width: 100% !important;
}

.mb-2, .my-2 {
  margin-bottom: 0.5rem !important;
}

img {
  vertical-align: middle;
  border-style: none;
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
          // font-family: "Poppins";
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

    .text-title {
      color: #fff !important;
    }

    h2, .h2 {
      font-size: 2.25rem;
      line-height: 1.25;
  }


  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, .display-1, .display-2, .display-3, .display-4, .display-res-1, .display-res-2, .display-res-3, .display-res-4 {
    font-weight: 700;
    line-height: 1.125;
    margin-bottom: 0;
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
  color: #cde2fb;
  display: inline-block;
  vertical-align: super;
  font-size: 16px;
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
              <div className="section-back-text">404</div>
              <img
                className="d-none-1 d-lg-block z-index-3"
                src="/assets/images/content/x/mandarin.png"
                alt=""
                data-size="280px"
                data-at="10%;bottom 35%"
                style={{ width: "400px" }}
              />
              {/* <img
          className="d-none d-lg-block z-index-3"
          src="assets/images/content/x/kiwi-blur.png"
          alt=""
          data-size="137px"
          data-at="right 5%;35%"
        />
        <img
          className="d-none d-lg-block z-index-3"
          src="assets/images/content/x/shpinat-2.png"
          alt=""
          data-size="50px"
          data-at="65%;0%;-25deg"
        /> */}
            </div>
            <div className="z-index-4 position-relative text-center">
              <h1 className="section-title">Page Not Found</h1>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/">
                    Home
                  </a>
                  <span className="mx-2">\</span>
                  <span>404</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row"></div>
          <div className="text-center">
            <div>
              <img
                className="mw-100 mb-5"
                src="assets/images/parts/under-construction.png"
                alt=""
              />
            </div>
            <h2 className="text-title mb-2">
              Sorry! The page you're looking for is not Found!
            </h2>

            <a className="btn btn-theme" href="/shop/veggies">
              View Shop
            </a>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Error;
