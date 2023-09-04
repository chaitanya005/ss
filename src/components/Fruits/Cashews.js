import React from "react";
import { Helmet } from "react-helmet";

const Cashews = () => {
  return (
    <React.Fragment>
      <Helmet>
        <link
          href="/assets/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
          defer
        />
        <link
          href="/assets/css/theme.min.css"
          rel="stylesheet"
          type="text/css"
          async
        />
        <link
          href="/assets/animate.css/animate.min.css"
          rel="stylesheet"
          type="text/css"
          rel="preload"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
          rel="stylesheet"
          type="text/css"
          //   rel="preload"
          as="font"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          type="text/css"
          //   rel="preload"
          as="font"
        />
      </Helmet>
      <div>
        <section className="">
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
              <h2 className="section-title">Cashews</h2>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="grid justify-content-center row">
              <div className="col-sm-6 col-md-4 col-lg-3">
                <article className="entity-block entity-hover-shadow bg-white text-center">
                  <div className="my-3 entity-image">
                    <div className="embed-responsive embed-responsive-4by3">
                      <img
                        className="embed-responsive-item"
                        src="/images/cashew.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="entity-bg"
                    style={{ background: "#cdced2", borderRadius: "0.5rem" }}
                  ></div>
                  <div className="pt-0 entity-content">
                    <h4 className="entity-title">
                      <a
                        className="content-link"
                        href="#"
                        style={{ color: "#000" }}
                      >
                        Cashew
                      </a>
                    </h4>
                    <div className="entity-price" style={{ color: "#000" }}>
                      <span className="currency">Rs.</span>340
                      <span className="price-unit">/ 500 gms</span>
                    </div>
                    <div className="mt-4 entity-action-btns">
                      <a className="btn-wide btn btn-theme" href="#">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <br />
      </div>
    </React.Fragment>
  );
};

export default Cashews;
