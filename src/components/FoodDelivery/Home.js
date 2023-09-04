import React from "react";
import { Helmet } from "react-helmet";

const FoodHome = () => {
  return (
    <React.Fragment>
      <header className="header-colorfull header-horizontal header-over header-view-side">
        <div className="container"></div>
      </header>
      <section
        className="white-curve-after after-head slick-top-fix section-white-text"
        style={{ minHeight: "3rem" }}
      >
        <div
          className="slick-view-banner slick-numeric-navigation slick-carousel"
          data-slider="top-side-numbers"
        >
          <div
            className="slick-slides slick-initialized slick-slider slick-dotted"
            style={{ marginBottom: "10px" }}
          >
            <div className="slick-slide">
              <div className="section-white-text entity-banner content-offs section-solid justify-content-center bg-light-green">
                <div className="container text-center text-lg-left flex-0 entity-content">
                  <div className="my-auto position-relative align-items-lg-center flex-0 row">
                    <div className="full-block">
                      <div className="section-back-text">Food</div>
                    </div>
                    <div className="m-lg-auto d-flex z-index-2 position-relative col"></div>

                    <div className="mr-lg-5 mt-5 my-lg-auto order-lg-first z-index-4 position-relative">
                      <h2 className="h1 entity-title">
                        Find Awesome Deals in{" "}
                        <span className="text-bittersweet">Chirala</span>
                      </h2>
                      <div className="h4 mt-0 entity-subtitle"></div>
                      <p className="mb-4 pb-2 entity-text">
                        Lists of top restaurants, hotels and ice-cream parlours
                        in Chirala, based on trends
                      </p>
                      <div className="entity-action-btns">
                        <a
                          className="btn-wide btn btn-theme-white-bordered"
                          href="/veggies/shop"
                        >
                          Order now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FoodHome;
