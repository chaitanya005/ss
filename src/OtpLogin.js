import React, { useState } from "react";
import db, { auth, firebase } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./features/user/userSlice";
import { createUserDocument } from "./firebase";
import { useHistory } from "react-router";

const OtpLogin = () => {
  const [loginNumber, setLoginNumber] = useState("");
  const [otpCode, setOtpCode] = useState();
  const [isSent, setIsSent] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha");
  };

  const handleNumber = (e) => {
    e.preventDefault();
    configureCaptcha();
    // let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    let number = "+1" + "1234567890";
    const appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(number, appVerifier)
      .then((e) => {
        window.confirmationResult = e;
        alert("OTP has been sent");
        setIsSent(true);
        console.log("OTP has been sent");
        /* let code = prompt("Enter the otp", "");
      if (code == null) return;
      e.confirm(code)
        .then(async (result) => {
          console.log(result.user.phoneNumber, result.user.uid, "user");
          dispatch(
            setUser({
              name: "",
              email: "",
              photo: "",
              uid: result.user.uid,
              phoneNumber: result.user.phoneNumber,
            })
          );
          await createUserDocument(result.user);  */

        // })
        // .then(() => history.push("/cart"))
      })
      .catch((err) => console.log(err));
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otpCode;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(result.user.phoneNumber);
        console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div style={{ color: "#000" }}>Enter Number:</div>
      <form onSubmit={handleNumber}>
        <input
          type="text"
          value={loginNumber}
          onChange={(e) => setLoginNumber(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {!isSent ? <div id="recaptcha"></div> : ""}
      <form onSubmit={onSubmitOTP}>
        <input
          type="text"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default OtpLogin;
