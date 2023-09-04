import React from "react";

const HomePage = () => {
  return (
    <React.Fragment>
      <header className="header-colorfull header-horizontal header-over header-view-side">
        <div className="container"></div>
      </header>
      <section className="white-curve-after after-head slick-top-fix section-white-text">
        <div
          className="slick-view-banner slick-numeric-navigation slick-carousel"
          data-slider="top-side-numbers"
        >
          <div className="slick-slides slick-initialized slick-slider slick-dotted">
            {/*  <div className="slick-slide">
                            <div
                                className="section-white-text entity-banner content-offs section-solid justify-content-center bg-orange">
                                <div className="container text-center text-lg-left flex-0 entity-content">
                                    <div className="my-auto position-relative align-items-lg-center flex-0 row">
                                        <div className="full-block">
                                            <div className="section-back-text">Organic</div>
                                            <img className="d-none d-lg-block z-index-3"
                                                src="assets/images/content/x/shpinat-2.png" alt="" data-size="51px"
                                                data-at="61%;-20%;-25deg" />
                                            <img className="d-none d-lg-block z-index-3"
                                                src="assets/images/content/x/shpinat-1.png" alt="" data-size="122px"
                                                data-at="29%;21%;-90deg" />
                                            <img className="d-none d-lg-block z-index-3"
                                                src="assets/images/content/x/shpinat-3.png" alt="" data-size="95px"
                                                data-at="47%;86%" />
                                            <img className="d-none d-lg-block z-index-3"
                                                src="assets/images/content/x/kiwi-blur.png" alt="" data-size="137px"
                                                data-at="92%;6%" />
                                        </div>
                                        <div className="m-lg-auto d-flex z-index-2 position-relative col">
                                            <img
                                                className="px-5 px-lg-0 m-auto col-auto mw-100"
                                                src="assets/images/content/x/fruits-plate.png" alt="" />
                                        </div>
                                        <div
                                            className="col-lg-6 mr-lg-5 mt-5 my-lg-auto order-lg-first z-index-4 position-relative">
                                            <h2 className="h1 entity-title">Save on all Products <span
                                                className="text-crimson">45%</span> OFF</h2>
                                            <div className="h4 mt-0 text-uppercase font-weight-medium entity-subtitle">Product
                                                crafted with care</div>
                                            <p className="mb-4 pb-2 entity-text">Bred for a high content of beneficial substances.
                                                Our products are all fresh and healthy.</p>
                                            <div className="entity-action-btns"><a className="btn-wide btn btn-theme-white-bordered"
                                                href="shop-sidebar-right.html">shop now</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            <div className="slick-slide">
              <div className="section-white-text entity-banner content-offs section-solid justify-content-center bg-light-green">
                <div className="container text-center text-lg-left flex-0 entity-content">
                  <div className="my-auto position-relative align-items-lg-center flex-0 row">
                    <div className="full-block">
                      <div className="section-back-text">Fresh</div>
                      <img
                        className="d-none d-lg-block z-index-3"
                        src="assets/images/content/x/shpinat-2.png"
                        alt=""
                        data-size="51px"
                        data-at="46%;5%;-26deg"
                      />
                      {/* <img className="d-none d-lg-block z-index-3"
                                            src="assets/images/content/x/kiwi-blur.png" alt="" data-size="88px"
                                            data-at="43%;78%" />
                                            <img className="d-none d-lg-block z-index-3"
                                            src="assets/images/content/x/strawberry.png" alt="" data-size="100px"
                                            data-at="69%;-5%;-18deg" />
                                            <img className="d-none d-lg-block z-index-3"
                                            src="assets/images/content/x/shpinat-3.png" alt="" data-size="150px"
                                            data-at="97%;82%" /> */}
                    </div>
                    <div className="m-lg-auto d-flex z-index-2 position-relative col">
                      <img
                        className="m-auto col-auto px-5 pr-lg-0 mw-100"
                        src="assets/images/content/x/banana.png"
                        alt=""
                      />
                    </div>

                    <div className="col-lg-5 mr-lg-5 mt-5 my-lg-auto order-lg-first z-index-4 position-relative">
                      <h2 className="h1 entity-title">
                        Banana{" "}
                        <span className="text-bittersweet">Every Day</span>
                      </h2>
                      <div className="h4 mt-0 entity-subtitle">
                        Product crafted with care
                      </div>
                      <p className="mb-4 pb-2 entity-text">
                        Bred for a high content of beneficial substances. Our
                        products are all fresh and healthy.
                      </p>
                      <div className="entity-action-btns">
                        <a
                          className="btn-wide btn btn-theme-white-bordered"
                          href="/veggies/shop"
                        >
                          shop now
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

export default HomePage;
