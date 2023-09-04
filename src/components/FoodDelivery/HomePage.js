import axios from "axios";
import React from "react";
import styles from "./HomePage.module.css";

const HomePageTwo = () => {
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const handleClick = async () => {
    var amount = "10000.00";
    var phone_number = "+919898989898";
    var email = "kittu@gmail.com";
    var orderId = "ORDERID_78464548746";
    let params = {
      orderId: orderId,
      email: email,
      amount: amount,
      phone_number: phone_number,
    };

    var url = "https://paytm-payment-gateway.herokuapp.com/payment";
    var request = {
      url: url,
      params: params,
      method: "get",
    };

    const response = await axios(request);
    // console.log(response);
    const processParams = await response.data;
    console.log(processParams);

    var details = {
      // action: "https://securegw-stage.paytm.in/order/process",
      action: "https://securegw.paytm.in/order/process",
      params: processParams,
    };

    post(details);
  };

  const handleClicker = () => {
    axios
      .post("https://paytm-payment-gateway.herokuapp.com/payments")
      .then((res) => {
        console.log(res.data);
        /* var details = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: res.data.body,
        };
        post(details); */
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
};

/* <style
                          data-emotion-css="ahex7a-accordianImageRight-bgImage"
                        >
                          .css-ahex7a-accordianImageRight-bgImage {
                            height: 70%;
                            object-fit: cover;
                            float: right;
                            object-position: 20%;
                            height: 34em;
                            position: relative;
                            object-fit: cover;
                            object-position: 80% 0;
                          }</style> */

export default HomePageTwo;
