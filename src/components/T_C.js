import React from "react";
import { Helmet } from "react-helmet";

const T_C = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | T & C</title>
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
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" ;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #fff !important;
          text-align: left;
          // background-color: #fff;
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


@media (min-width: 992px) {
  .d-lg-block {
    display: block !important;
  }
}

.position-relative {
  position: relative !important;
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
`}
        </style>

        <style>
          {`
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

.bg-theme, .bg-body-main, .bg-back-image, .bg-orange {
  background-color: #ffb524 !important;
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
  // background-image: url("/assets/images/parts/black-curve.png");
  background-repeat: repeat-x;
}

.white-curve-after:after {
  bottom: 0;
  background-position: 70% 0;
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
              <div className="section-back-text"></div>
              <img
                className="d-none-1 d-lg-block z-index-3"
                src="/assets/images/content/x/mandarin.png"
                alt=""
                data-size="280px"
                data-at="10%;bottom 35%"
                style={{ width: "400px" }}
              />
            </div>
            <div className="z-index-4 position-relative text-center">
              <h1 className="section-title">Terms & Conditions</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        {/* <div>
          The terms "We" / "Us" / "Our"/”Company” individually and collectively
          refer to <a href="/">Spont Store</a> and the terms "Visitor” ”User”
          refer to the users. This page states the Terms and Conditions under
          which you (Visitor) may visit this website (“Website”). Please read
          this page carefully. If you do not accept the Terms and Conditions
          stated here, we would request you to exit this site. The business, any
          of its business divisions and / or its subsidiaries, associate
          companies or subsidiaries to subsidiaries or such other investment
          companies (in India or abroad) reserve their respective rights to
          revise these Terms and Conditions at any time by updating this
          posting. You should visit this page periodically to re-appraise
          yourself of the Terms and Conditions, because they are binding on all
          users of this Website.
        </div> */}
        <br />
        <div>
          <h5>Use of Content:</h5>
          <div>
            All logos, brands, marks headings, labels, names, signatures,
            numerals, shapes or any combinations thereof, appearing in this
            site, except as otherwise noted, are properties either owned, or
            used under licence, by the business and / or its associate entities
            who feature on this Website. The use of these properties or any
            other content on this site, except as provided in these terms and
            conditions or in the site content, is strictly prohibited. You may
            not sell or modify the content of this Website or reproduce,
            display, publicly perform, distribute, or otherwise use the
            materials in any way for any public or commercial purpose without
            the respective organisation’s or entity’s written permission.
          </div>
        </div>
        <br />
        <br />
        <h5>ACCEPTABLE WEBSITE USE</h5>
        <br />
        <div>
          <h6>(A) Security Rules</h6>
          <div>
            Visitors are prohibited from violating or attempting to violate the
            security of the Web site, including, without limitation, (1)
            accessing data not intended for such user or logging into a server
            or account which the user is not authorised to access, (2)
            attempting to probe, scan or test the vulnerability of a system or
            network or to breach security or authentication measures without
            proper authorisation, (3) attempting to interfere with service to
            any user, host or network, including, without limitation, via means
            of submitting a virus or "Trojan horse" to the Website, overloading,
            "flooding", "mail bombing" or "crashing", or (4) sending unsolicited
            electronic mail, including promotions and/or advertising of products
            or services. Violations of system or network security may result in
            civil or criminal liability. The business and / or its associate
            entities will have the right to investigate occurrences that they
            suspect as involving such violations and will have the right to
            involve, and cooperate with, law enforcement authorities in
            prosecuting users who are involved in such violations.
          </div>
          <br />
          <h6>(B) General Rules</h6>

          <div>
            Visitors may not use the Web Site in order to transmit, distribute,
            store or destroy material (a) that could constitute or encourage
            conduct that would be considered a criminal offence or violate any
            applicable law or regulation, (b) in a manner that will infringe the
            copyright, trademark, trade secret or other intellectual property
            rights of others or violate the privacy or publicity of other
            personal rights of others, or (c) that is libellous, defamatory,
            pornographic, profane, obscene, threatening, abusive or hateful.
          </div>
          <br />
          <h6>INDEMNITY</h6>
          <div>
            The User unilaterally agree to indemnify and hold harmless, without
            objection, the Company, its officers, directors, employees and
            agents from and against any claims, actions and/or demands and/or
            liabilities and/or losses and/or damages whatsoever arising from or
            resulting from their use of <a href="/">SpontStore</a> or their
            breach of the terms .
          </div>
          <br />
          <h6>LIABILITY</h6>
          <div>
            User agrees that neither Company nor its group companies, directors,
            officers or employee shall be liable for any direct or/and indirect
            or/and incidental or/and special or/and consequential or/and
            exemplary damages, resulting from the use or/and the inability to
            use the service or/and for cost of procurement of substitute goods
            or/and services or resulting from any goods or/and data or/and
            information or/and services purchased or/and obtained or/and
            messages received or/and transactions entered into through or/and
            from the service or/and resulting from unauthorized access to or/and
            alteration of user's transmissions or/and data or/and arising from
            any other matter relating to the service, including but not limited
            to, damages for loss of profits or/and use or/and data or other
            intangible, even if Company has been advised of the possibility of
            such damages. User further agrees that Company shall not be liable
            for any damages arising from interruption, suspension or termination
            of service, including but not limited to direct or/and indirect
            or/and incidental or/and special consequential or/and exemplary
            damages, whether such interruption or/and suspension or/and
            termination was justified or not, negligent or intentional,
            inadvertent or advertent. User agrees that Company shall not be
            responsible or liable to user, or anyone, for the statements or
            conduct of any third party of the service. In sum, in no event shall
            Company's total liability to the User for all damages or/and losses
            or/and causes of action exceed the amount paid by the User to
            Company, if any, that is related to the cause of action.
          </div>
          <br />
          <h6>DISCLAIMER OF CONSEQUENTIAL DAMAGES</h6>
          <div>
            In no event shall Company or any parties, organizations or entities
            associated with the corporate brand name us or otherwise, mentioned
            at this Website be liable for any damages whatsoever (including,
            without limitations, incidental and consequential damages, lost
            profits, or damage to computer hardware or loss of data information
            or business interruption) resulting from the use or inability to use
            the Website and the Website material, whether based on warranty,
            contract, tort, or any other legal theory, and whether or not, such
            organization or entities were advised of the possibility of such
            damages.
          </div>
        </div>
        {/* <div style={{ fontSize: "20px" }}>
          <ul>
            <li>
              {" "}
              Once you ordered any product we don’t accept returns without a
              valid reason.
            </li>
            <li>
              In case of refund we aren't going to pay you the shipping and
              payment gateway charges.
            </li>
            <li>
              In case of return we are not going to accept the products if there
              was any damage in the time of shipping to us.
            </li>
          </ul>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default T_C;
