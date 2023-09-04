import React, { useState } from "react";
import db, { auth, firebase, provider } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setUser, getUserUid } from "../features/user/userSlice";
import { createUserDocument } from "../firebase";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import GoogleIcon from "@mui/icons-material/Google";
import Loading from "./Loading";

const Login = () => {
  const [loginNumber, setLoginNumber] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [code, setCode] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const uId = useSelector(getUserUid);
  const [err, setErr] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha");
    setIsCaptchaVerified(true);
    /* if (window.recaptchaVerifier !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } */
  };

  const handleNumber = () => {
    // setIsLoading(true);
    if (!uId) {
      configureCaptcha();
      let number = "+91" + loginNumber;
      const appVerifier = window.recaptchaVerifier;
      auth
        .signInWithPhoneNumber(number, appVerifier)
        .then((e) => {
          //   let code = prompt("Enter the otp", "");
          window.confirmationResult = e;
          setCodeSent(true);
          setIsLoading(false);
          alert("OTP Sent");
        })
        .catch((err) => {
          console.log(err);
          // console.log(err.message);
          setErr(err.message);
        });
    } else {
      alert("Already Logged In");
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        dispatch(
          setUser({
            name: "",
            email: "",
            photo: "",
            uid: result.user.uid,
            phoneNumber: result.user.phoneNumber,
          })
        );
        await createUserDocument(result.user);
        history.push("/checkout");
      })
      .catch((error) => {
        console.log(error.message);
        setErr();
      });
  };

  const handleGoogleLogin = () => {
    if (!uId) {
      auth
        .signInWithPopup(provider)
        .then((res) => {
          auth
            .signInWithCredential(res.credential)
            .then(async (res) => {
              dispatch(
                setUser({
                  name: res.user.displayName,
                  email: res.user.email,
                  photo: res.user.photoURL,
                  uid: res.user.uid,
                  phoneNumber: "",
                })
              );
              await createUserDocument(res.user);
              history.push("/checkout");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Already Logged In");
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | Login </title>
        <style>{`
        body {
          background-color: #fff;
        }
        `}</style>
        <style>{`
        html {
          font-size: 70%;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          font-size-adjust: 100%;
      }
      
      body {
          font: normal 300 1.4rem/1.86 "Poppins", sans-serif;
          color: #666666;
          background-color: #fff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
      }
      
::selection {
  color: #fff;
  background-color: #cc9966;
}

p {
  margin-bottom: 1.5rem;
}

ul, ol {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}hr {
  border: none;
  border-top: 1px solid #ebebeb;
  margin: 3rem auto 2.5rem;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
  font-weight: 500;
  line-height: 1.1;
  margin-bottom: 1.4rem;
  color: #333333;
  letter-spacing: -.03em;
}
h5, .h5 {
  font-size: 2rem;
  letter-spacing: -.025em;
}
a {
  color: #cc9966;
  text-decoration: none;
  transition: color 0.3s ease;
}
.row {
  margin-left: -10px;
  margin-right: -10px;
}

.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl, .col-xl-auto {
  padding-right: 10px;
  padding-left: 10px;
}
.container {
  width: 1188px;
  max-width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
@media screen and (min-width: 1280px) {
  .container {
      max-width: 1200px;
  }
}
a {
  // font-family: 'Poppins';
}

p {
  margin-bottom: 0;
  font-size: 1.4rem;
  font-weight: 300;
  // font-family: 'Poppins';
  letter-spacing: 0;
  color: #777;
}
::selection {
  background-color: #c96;
}
a {
  color: #cc9966;
}
.btn-outline-primary-2 {
  color: #c96;
  background-color: transparent;
  background-image: none;
  border-color: #c96;
  box-shadow: none;
}

.btn-outline-primary-2:hover, .btn-outline-primary-2:focus, .btn-outline-primary-2.focus, .btn-outline-primary-2:not(:disabled):not(.disabled):active, .btn-outline-primary-2:not(:disabled):not(.disabled).active, .show > .btn-outline-primary-2.dropdown-toggle {
  color: #fff;
  background-color: #c96;
  border-color: #c96;
  box-shadow: none;
}
.nav.nav-pills .nav-item.show .nav-link, .nav.nav-pills .nav-item .nav-link.active {
  color: #c96;
  border-bottom-color: #c96;
}
::selection {
  background-color: #c96;
}
a {
  color: #cc9966;
}
.btn-outline-primary-2 {
  color: #c96;
  background-color: transparent;
  background-image: none;
  border-color: #c96;
  box-shadow: none;
}
.btn-outline-primary-2:hover, .btn-outline-primary-2:focus, .btn-outline-primary-2.focus, .btn-outline-primary-2:not(:disabled):not(.disabled):active, .btn-outline-primary-2:not(:disabled):not(.disabled).active, .show > .btn-outline-primary-2.dropdown-toggle {
  color: #fff;
  background-color: #c96;
  border-color: #c96;
  box-shadow: none;
}
.nav.nav-pills .nav-item.show .nav-link, .nav.nav-pills .nav-item .nav-link.active {
  color: #c96;
  border-bottom-color: #c96;
}
.tab-pane {
  padding: 1.4rem 2.2rem;
}

.tab-pane p:last-child {
  margin-bottom: 0;
}
.nav.nav-pills .nav-link {
  color: #777;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.5;
  letter-spacing: -.01em;
  padding: .45rem 1rem;
  border-radius: 0;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-bottom: .1rem solid transparent;
  background-color: transparent;
  transition: all .35s ease;
}
.nav.nav-pills .nav-item.show .nav-link, .nav.nav-pills .nav-item .nav-link.active {
  color: #c96;
  border-color: #d7d7d7;
  border-bottom-color: #c96;
}
.nav-pills + .tab-content .tab-pane {
  padding: 1.4rem 0;
}
.nav-pills + .tab-content .tab-pane p:last-child {
  margin-bottom: 0;
}
@media screen and (min-width: 992px) {
  .nav-pills + .tab-content .tab-pane {
      padding-left: 1rem;
      padding-right: 1rem;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: .85rem 1.5rem;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.5;
  letter-spacing: -.01em;
  min-width: 170px;
  border-radius: 0;
  white-space: normal;
  transition: all 0.3s;
}

.btn span {
  line-height: 1;
}

.btn:focus {
  box-shadow: none;
}

.btn:focus, .btn:active {
  outline: none !important;
}

.btn:active:focus {
  box-shadow: none !important;
}

.btn:active {
  outline: none;
}
.btn-outline-primary-2 {
  color: #c96;
  background-color: transparent;
  background-image: none;
  border-color: #c96;
  box-shadow: none;
}

.btn-outline-primary-2:hover, .btn-outline-primary-2:focus, .btn-outline-primary-2.focus, .btn-outline-primary-2:not(:disabled):not(.disabled):active, .btn-outline-primary-2:not(:disabled):not(.disabled).active, .show > .btn-outline-primary-2.dropdown-toggle {
  color: #fff;
  background-color: #c96;
  border-color: #c96;
  box-shadow: none;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group .form-control, .form-group .select-custom {
  margin-bottom: 0;
}

.form-control {
  height: 40px;
  padding: .85rem 2rem;
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 300;
  color: #777;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  border-radius: 0;
  margin-bottom: 2rem;
  transition: all 0.3s;
  box-shadow: none;
}

label {
  color: #666666;
  font-weight: 300;
  font-size: 1.4rem;
  margin: 0 0 1.1rem;
}

.form-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: .6rem;
}
.modal-body {
  padding: 0;
}
.modal-content {
  border: none;
  box-shadow: 5px 10px 16px rgba(51, 51, 51, 0.05), -5px 10px 16px rgba(51, 51, 51, 0.05);
}
@media screen and (min-width: 768px) {
  .modal-dialog {
      max-width: 575px;
  }
}
button:focus {
  outline: none;
}
.nav.nav-pills .nav-link {
  font-size: 1.6rem;
}
.form-box {
  max-width: 575px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding: 2.2rem 2rem 4.4rem;
  box-shadow: 0 3px 16px rgba(51, 51, 51, 0.1);
}

.form-box .btn {
  min-width: 115px;
}

.form-tab .nav.nav-pills {
  color: #333333;
  border-bottom: .1rem solid #ebebeb;
}

.form-tab .nav.nav-pills .nav-item {
  margin-bottom: -.1rem;
}
.form-tab .nav.nav-pills .nav-link {
  text-transform: capitalize;
  font-weight: 400;
  font-size: 2rem;
  letter-spacing: -.025em;
  color: inherit;
  border-bottom-width: .2rem;
  padding: .9rem 1rem;
}

.form-tab .nav.nav-pills .nav-link.active {
  color: inherit;
}

.form-tab .nav-fill .nav-item {
  flex: 1 1 0;
}

.form-tab .tab-content .tab-pane {
  padding: 2rem 0 0;
}

.form-tab .form-group {
  margin-bottom: 1.3rem;
}

.form-tab .form-footer {
  padding-top: .6rem;
  padding-bottom: 3rem;
  border-bottom: .1rem solid #ebebeb;
  margin-bottom: 2.3rem;
}

.form-tab .form-footer .btn {
  margin-left: auto;
  margin-top: 1rem;
  order: 2;
  width: 100%;
}

.form-choice {
  color: #333333;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.5;
  letter-spacing: -.025em;
}

.form-choice p {
  margin-bottom: 2.7rem;
}

.btn.btn-login {
  color: #333333;
  font-weight: 300;
  font-size: 2rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: .85rem 1rem;
  border: .1rem solid #ebebeb;
  min-width: 0;
}
.btn.btn-login:hover, .btn.btn-login:focus {
  background-color: #f5f6f9;
}
@media screen and (min-width: 576px) {
  .form-tab .form-footer .btn {
    width: auto;
    margin-top: 0;
  }
}

@media screen and (min-width: 768px) {
  .form-box {
      padding: 3.7rem 6rem 6.4rem;
  }

  .form-tab .nav.nav-pills .nav-link {
      font-size: 2.4rem;
  }

  .form-tab .form-footer .btn {
      margin-left: 0;
      margin-right: 1.6rem;
      order: -1;
  }
}

        `}</style>

        {/* <link href="/assets/molla.css" rel="stylesheet" /> */}
        {/* <link href="/assets/css/theme.min.css" rel="stylesheet" />
        <link href="/assets/css/theme.min.css" rel="stylesheet" /> */}
        {/* <link href="/assets/mollabstrap.css" rel="stylesheet" /> */}
      </Helmet>
      <div
        className="modal fade"
        id="signin-modal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            margin: "auto",
            position: "relative",
            top: "50px",
            marginBottom: "80px",
          }}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div
                className="form-box"
                // style={{ margin: "auto", justifyContent: "center" }}
              >
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill" role="tablist">
                    <li className="nav-item">
                      <div
                        className="nav-link active"
                        // id="signin-tab"
                        // data-toggle="tab"
                        // role="tab"
                        // aria-controls="signin"
                        // aria-selected="true"
                        style={{ borderBottomColor: "#08c" }}
                      >
                        Sign In
                      </div>
                    </li>
                    {/*  <li className="nav-item">
                      <a
                        className="nav-link"
                        id="register-tab"
                        data-toggle="tab"
                        href="#register"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                      >
                        Register
                      </a>
                    </li> */}
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div
                      className="tab-pane fade show active"
                      id="signin"
                      role="tabpanel"
                      aria-labelledby="signin-tab"
                    >
                      {!codeSent ? (
                        <div className="form-group">
                          <form onSubmit={handleNumber}>
                            <label for="singin-email">Phone Number *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="singin-email"
                              name="singin-email"
                              style={{ display: "block", width: "100%" }}
                              onChange={(e) => setLoginNumber(e.target.value)}
                            />
                          </form>
                        </div>
                      ) : (
                        ""
                      )}
                      {isLoading ? <Loading /> : ""}
                      {!codeSent ? <div id="recaptcha"></div> : ""}
                      {!isCaptchaVerified ? (
                        <div className="form-footer">
                          <button
                            type="submit"
                            style={{
                              borderColor: "#08c",
                              color: "#fff",
                              backgroundColor: "#08c",
                              borderRadius: "5px",
                            }}
                            className="btn btn-outline-primary-2"
                            onClick={handleNumber}
                          >
                            <span>Send OTP</span>
                            {/* <i className="icon-long-arrow-right"></i> */}
                          </button>
                          <p
                            style={{
                              color: "red",
                              textAlign: "center",
                              margin: "auto",
                            }}
                          >
                            {err}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      {codeSent ? (
                        <React.Fragment>
                          <div className="form-group">
                            <form onSubmit={onSubmitOTP}>
                              <label for="singin-password">
                                Enter One Time Password (OTP)
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="singin-password"
                                name="singin-password"
                                required
                                style={{ display: "block", width: "100%" }}
                                onChange={(e) => setCode(e.target.value)}
                              />
                            </form>
                          </div>

                          <div className="form-footer">
                            <button
                              type="submit"
                              style={{
                                borderColor: "#08c",
                                color: "#fff",
                                backgroundColor: "#08c",
                                borderRadius: "5px",
                              }}
                              className="btn btn-outline-primary-2"
                              onClick={onSubmitOTP}
                            >
                              <span>Submit OTP</span>
                              {/* <i className="icon-long-arrow-right"></i> */}
                            </button>
                          </div>
                        </React.Fragment>
                      ) : (
                        ""
                      )}

                      <div className="form-choice">
                        <p
                          className="text-center"
                          style={{ textAlign: "center" }}
                        >
                          or sign in with
                        </p>
                        <div className="row">
                          <div className="col-sm-6">
                            <div
                              className="btn btn-login btn-g"
                              style={{ cursor: "pointer", fontWeight: "400" }}
                              onClick={handleGoogleLogin}
                            >
                              <GoogleIcon
                                style={{
                                  marginRight: "5px",
                                  marginTop: "3px",
                                  color: "#cc3333",
                                }}
                                fontSize="large"
                              />
                              Login With Google
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
