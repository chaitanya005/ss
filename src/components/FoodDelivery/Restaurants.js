import React from "react";
import styles from "./Restaurants.module.css";

const Restaurants = () => {
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
              <div className="section-back-text">Shop</div>
            </div>
            <div className="z-index-4 position-relative text-center">
              <h1 className="section-title">Offers Near You</h1>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/veggies">
                    Food
                  </a>
                  <span className="mx-2">\</span>
                  <span>Restaurants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container" style={{ marginTop: "3%" }}>
        <div className={styles.mainrow}>
          <div className="col-md-3">
            <div
              className="filters shadow-sm rounded bg-white mb-4"
              style={{ background: "#292830" }}
            >
              <div
                className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3"
                style={{ background: "#292830" }}
              >
                <h5 className="m-0" style={{ color: "#fff" }}>
                  Filter By
                </h5>
              </div>
              <div className="filters-body" style={{ background: "#292830" }}>
                <div>
                  <div
                    className="filters-card border-bottom p-4"
                    style={{ borderBottom: "1px solid #292830" }}
                  >
                    <div className="filters-card-header" id="headingTwo">
                      <h6 className="mb-0">
                        <div
                          className="btn-link"
                          data-toggle="collapse"
                          data-target="#collapsetwo"
                          aria-expanded="true"
                          aria-controls="collapsetwo"
                        >
                          All cuisines
                          {/* <i className="icofont-arrow-down float-right"></i> */}
                        </div>
                      </h6>
                    </div>
                    <div
                      id="collapsetwo"
                      className="collapse show"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                      style={{ marginTop: "3%" }}
                    >
                      <div className="filters-card-body card-shop-filters">
                        {/* <form className="filters-search mb-3">
                          <div className="form-group">
                            <i className="icofont-search"></i>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Start typing to search..."
                            />
                          </div>
                        </form> */}
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb6"
                          />
                          <label
                            className="custom-control-label"
                            for="cb6"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            American
                            {/* <small className="text-black-50">156</small> */}
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb7"
                          />
                          <label
                            className="custom-control-label"
                            for="cb7"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Pizza
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb8"
                          />
                          <label
                            className="custom-control-label"
                            for="cb8"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Healthy
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb9"
                          />
                          <label
                            className="custom-control-label"
                            for="cb9"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Vegetarian
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb10"
                          />
                          <label
                            className="custom-control-label"
                            for="cb10"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Chinese
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb11"
                          />
                          <label
                            className="custom-control-label"
                            for="cb11"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Hamburgers
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb12"
                          />
                          <label
                            className="custom-control-label"
                            for="cb12"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Dessert
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb13"
                          />
                          <label
                            className="custom-control-label"
                            for="cb13"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Chicken
                          </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="cb14"
                          />
                          <label
                            className="custom-control-label"
                            for="cb14"
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            Indian
                          </label>
                        </div>
                        {/* <div className="mt-2">
                          <a href="#" className="link">
                            See all
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className={styles.row}>
              <div className="col-md-4 col-sm-6 mb-4 pb-2">
                <div
                  className="
                    list-card
                    bg-white
                    rounded
                    overflow-hidden
                    position-relative
                    shadow-sm
                "
                >
                  <div className="list-card-image">
                    <div
                      className="star position-absolute"
                      style={{ right: "8px", bottom: "8px" }}
                    >
                      <span className="badge badge-success">
                        <i className="icofont-star"></i> 3.1 (300+)
                      </span>
                    </div>
                    <div className="favourite-heart text-danger position-absolute">
                      <a href="detail.html">
                        {/*                   <i className="icofont-heart"></i> */}
                      </a>
                    </div>
                    {/* <div
                      className="member-plan position-absolute"
                      style={{ left: "8px", top: "8px" }}
                    >
                      <span className={styles.badgeDark}>Promoted</span>
                    </div> */}
                    <a href="detail.html">
                      <img
                        src="/img/list/1.png"
                        className="img-fluid item-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div
                    className="p-3 position-relative"
                    style={{ background: "#292830" }}
                  >
                    <div className="list-card-body">
                      <h6 className="mb-1">
                        <a href="detail.html" className={styles.title}>
                          Dwaat
                        </a>
                      </h6>
                      <p
                        className="text-gray mb-3"
                        style={{ color: "#747d88" }}
                      >
                        North Indian • South Indian
                      </p>
                      <p className="text-gray mb-3 time">
                        <span
                          className="
                            bg-light
                            text-dark
                            rounded-sm
                            pl-2
                            pb-1
                            pt-1
                            pr-2
                        "
                        >
                          <i className="icofont-wall-clock"></i> 20–25 min
                        </span>
                        <span
                          className="float-right "
                          style={{ color: "#fff" }}
                        >
                          Rs. 250 FOR TWO
                        </span>
                      </p>
                    </div>
                    <div className="list-card-badge">
                      <span className="badge badge-success"></span>
                      <small style={{ color: "#fff" }}></small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 mb-4 pb-2">
                <div
                  className="
                    list-card
                    bg-white
                    rounded
                    overflow-hidden
                    position-relative
                    shadow-sm
                    "
                >
                  <div className="list-card-image">
                    <div
                      className="star position-absolute"
                      style={{ right: "8px", bottom: "8px" }}
                    >
                      <span className="badge badge-success">
                        <i className="icofont-star"></i> 3.1 (300+)
                      </span>
                    </div>
                    <div className="favourite-heart text-danger position-absolute">
                      <a href="detail.html">
                        {/*                   <i className="icofont-heart"></i> */}
                      </a>
                    </div>
                    {/*  <div
                      className="member-plan position-absolute"
                      style={{ left: "8px", top: "8px" }}
                    >
                      <span className={styles.badgeDark}>Promoted</span>
                    </div> */}
                    <a href="detail.html">
                      <img
                        src="/img/list/1.png"
                        className="img-fluid item-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div
                    className="p-3 position-relative"
                    style={{ background: "#292830" }}
                  >
                    <div className="list-card-body">
                      <h6 className="mb-1">
                        <a href="detail.html" className={styles.title}>
                          Orange
                        </a>
                      </h6>
                      <p
                        className="text-gray mb-3"
                        style={{ color: "#747d88" }}
                      >
                        North Indian • South Indian • Veg
                      </p>
                      <p className="text-gray mb-3 time">
                        <span
                          className="
                            bg-light
                            text-dark
                            rounded-sm
                            pl-2
                            pb-1
                            pt-1
                            pr-2
                        "
                        >
                          <i className="icofont-wall-clock"></i> 20–25 min
                        </span>
                        <span
                          className="float-right "
                          style={{ color: "#fff " }}
                        >
                          Rs. 250 FOR TWO
                        </span>
                      </p>
                    </div>
                    {/* <div className="list-card-badge">
                      <span className="badge badge-success">OFFER</span>
                      <small style={{ color: "#fff" }}>
                        65% off | Use Coupon OSAHAN50
                      </small>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 mb-4 pb-2">
                <div
                  className="
                    list-card
                    bg-white
                    rounded
                    overflow-hidden
                    position-relative
                    shadow-sm
                    "
                >
                  <div className="list-card-image">
                    <div
                      className="star position-absolute"
                      style={{ right: "8px", bottom: "8px" }}
                    >
                      <span className="badge badge-success">
                        <i className="icofont-star"></i> 3.1 (300+)
                      </span>
                    </div>
                    <div className="favourite-heart text-danger position-absolute">
                      <a href="detail.html">
                        {/*                   <i className="icofont-heart"></i> */}
                      </a>
                    </div>
                    {/*  <div
                      className="member-plan position-absolute"
                      style={{ left: "8px", top: "8px" }}
                    >
                      <span className={styles.badgeDark}>Promoted</span>
                    </div> */}
                    <a href="detail.html">
                      <img
                        src="/img/list/1.png"
                        className="img-fluid item-img"
                        alt=""
                      />
                    </a>
                  </div>
                  <div
                    className="p-3 position-relative"
                    style={{ background: "#292830" }}
                  >
                    <div className="list-card-body">
                      <h6 className="mb-1">
                        <a href="detail.html" className={styles.title}>
                          Ice berg
                        </a>
                      </h6>
                      <p
                        className="text-gray mb-3"
                        style={{ color: "#747d88" }}
                      >
                        North Indian • South Indian • Veg
                      </p>
                      <p className="text-gray mb-3 time">
                        <span
                          className="
                            bg-light
                            text-dark
                            rounded-sm
                            pl-2
                            pb-1
                            pt-1
                            pr-2
                        "
                        >
                          <i className="icofont-wall-clock"></i> 20–25 min
                        </span>
                        <span
                          className="float-right "
                          style={{ color: "#fff " }}
                        >
                          Rs. 250 FOR TWO
                        </span>
                      </p>
                    </div>
                    {/* <div className="list-card-badge">
                      <span className="badge badge-success">OFFER</span>
                      <small style={{ color: "#fff" }}>
                        65% off | Use Coupon OSAHAN50
                      </small>
                    </div> */}
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

export default Restaurants;
