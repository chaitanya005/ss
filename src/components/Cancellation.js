import React from "react";

const Cancellation = () => {
  return (
    <React.Fragment>
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
              <div className="section-back-text">Cancel</div>
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
              <h1 className="section-title">Cancellation</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          You can cancel your order by contacting us by{" "}
          <a href="mailto:updates@spontstore.com">
            <b>
              <i>mail: updates@spontstore.com</i>
            </b>
          </a>{" "}
          <br />
          phone:{" "}
          <b>
            <i>+91 8790462050 / +91 9030462050</i>
          </b>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cancellation;
