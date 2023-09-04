import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Helmet } from "react-helmet";

const Footer = () => {
  return (
    <React.Fragment>
      <Helmet>
        {/*  <link href="/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" /> */}
        {/* <link href="/assets/css/theme.min.css" rel="stylesheet" /> */}
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
      
      [tabindex="-1"]:focus {
          outline: 0 !important;
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
    }a {
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

select {
  word-wrap: normal;
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
`}</style>
        <style>{`
body {
  font-family: "Poppins";
  color: #747d88;
  // background-color: #1d1c22;
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
  // background-image: url("assets/images/parts/black-curve.png");
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
      </Helmet>
      <footer className="white-curve-before curve-before-80 page-footer footer-view-links section-white-text">
        <div className="overflow-back bg-vegetables-pattern-white opacity-3"></div>
        <div className="footer-body">
          <div className="container">
            <nav className="footer-navbar">
              <div className="grid row">
                <div className="col-md-6 col-lg-3">
                  <a className="navbar-brand" href="/">
                    <span className="logo-element-line">
                      <span className="logo-icon">
                        <span
                          className="svg-content svg-fill-theme"
                          data-svg="/images/vegetables-pattern-white.webp"
                        ></span>
                      </span>
                      <span className="logo-text">Spont Store</span>
                    </span>
                  </a>
                  <p className="footer-text"></p>
                  {/* <div className="footer-socials">
                  <a className="footer-socials-link" href="/#">
                    <i className="fab fa-twitter"></i>
                  </a> 
                  <a className="footer-socials-link" href="#/">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a
                    className="footer-socials-link"
                    href="https://youtube.com/channel/UCHz6ZMeNxgwdM6EfsvhcIVA"
                  >
                    <i className="fab fa-youtube-square"></i>
                  </a>
                  <a
                    className="footer-socials-link"
                    href="https://instagram.com/shopandship.co.in?utm_medium=copy_link"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div> */}
                </div>
                <div className="col-md-12 col-lg-6 order-md-last">
                  <div className="grid row">
                    {/* <div class="col-md-6">
                    <h5 class="footer-title">Pages</h5>
                    <ul class="nav">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="/veggies/shop"
                          style={{ color: "#fff" }}
                        >
                          Veggies
                        </a>
                      </li>
                    </ul>
                  </div> */}
                    <div className="col-md-6">
                      <ul className="nav">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/shop/sarees"
                            style={{ color: "#fff" }}
                          >
                            Sarees
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/dryfruits"
                            style={{ color: "#fff" }}
                          >
                            Dry Fruits
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      {/* <h5 className="footer-title">Policies</h5> */}
                      <ul className="nav">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/about-us"
                            style={{ color: "#fff" }}
                          >
                            About Us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/privacy"
                            style={{ color: "#fff" }}
                          >
                            Privacy
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/returnandrefund"
                            style={{ color: "#fff" }}
                          >
                            Return, Refund and Cancellation
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/termsandconditions"
                            style={{ color: "#fff" }}
                          >
                            T&C
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="col-md-6">
                    <h5 className="footer-title">Policies</h5>
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link" href="about-us.html">
                          Terms & Conditions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about-us.html">
                          Return Policy
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about-us.html">
                          Accessibility
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about-us.html">
                          Privacy
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 order-lg-last">
                  <h5 className="footer-title" style={{ color: "#fff" }}>
                    Contact Us
                  </h5>
                  <div className="footer-text-info">
                    <WhatsAppIcon fontSize="small" /> +91 8790462050 <br />
                    <PhoneIcon fontSize="small" /> +91 9030462050 <br />
                    <a
                      href="mailto:updates@spontstore.com"
                      style={{ color: "#fff" }}
                    >
                      <MailIcon fontSize="small" />
                      {"  "}
                      updates@spontstore.com
                    </a>
                    <p style={{ color: "#fff" }}>
                      1/A Rajupalem Street, Swarna Road
                    </p>
                    <p style={{ color: "#fff" }}> Chirala-523155</p>
                    Follow us on{" "}
                    <a
                      href="https://www.facebook.com/spontstore/"
                      style={{ color: "#fff" }}
                    >
                      <FacebookIcon />
                    </a>{" "}
                    <a
                      href="https://youtube.com/channel/UCjOYdGM9m9VAjD0Jr7k8Qzg"
                      style={{ color: "#fff" }}
                    >
                      <YouTubeIcon />
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="footer-copy">
          <div className="container"></div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
