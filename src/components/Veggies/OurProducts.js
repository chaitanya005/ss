import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveVeggies, storedVeggies } from "../../features/veggies";
import { addToCart } from "../../features/cart/cart";

const OurProducts = () => {
  const dispatch = useDispatch();

  const storedVeggie = useSelector(storedVeggies);

  let allVeggies = [];

  useEffect(() => {
    db.collection("veggies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        let docu = doc.data();
        let id = doc.id;

        allVeggies = [...allVeggies, { veggieId: id, ...docu }];
      });
      // console.log(allVeggies);
      dispatch(
        saveVeggies({
          allVeggies,
        })
      );
    });
  }, []);

  let newItem = [];

  const handleAddToCart = async (veggie) => {
    // console.log(veggie);
    newItem = [{ ...veggie, qty: 1 }];

    // console.log(newItem);
    dispatch(
      addToCart({
        newItem,
      })
    );
  };

  // console.log(storedVeggie.storeVeggies.slice(0, 6));

  return (
    <section className="bg-light-green white-curve-before curve-before-0 white-curve-after curve-after-40 section-solid">
      <div className="overflow-back bg-vegetables-pattern opacity-10"></div>
      <div className="full-block">
        {/* <div className="container h-100 position-relative" data-size="50%">
          <img
            className="z-index-4 d-none d-xl-block mw-100"
            src="assets/images/content/x/section-lime.png"
            alt=""
            data-size="270px"
            data-at="115%;0"
          />
        </div> */}
      </div>
      <div className="section-head container left">
        <div className="section-icon">
          <span
            className="svg-fill-dark-lime-green svg-content"
            data-svg="assets/images/svg/title-kiwi.svg"
          ></span>
        </div>
        <div className="section-head-content">
          <h2 className="section-title">Our Products</h2>
          <p className="section-text">All the best items for You</p>
        </div>
      </div>
      <div className="container">
        <div className="grid row">
          {storedVeggie &&
            storedVeggie.storeVeggies.slice(0, 6).map((veggie) => (
              <div className="col-sm-6 col-lg-4" key={veggie}>
                <a href="/veggies/shop">
                  <article className="entity-block entity-hover-shadow text-center entity-preview-show-up">
                    <div className="entity-preview">
                      <div className="embed-responsive embed-responsive-4by3">
                        <img
                          className="embed-responsive-item"
                          src={veggie.img}
                          alt=""
                        />
                      </div>
                      <div className="with-back entity-preview-content">
                        <div className="mx-auto mt-auto mb-4 text-center">
                          {/* <a
                      className="btn-wide mr-2 btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      buy now
                    </a> */}
                          {/* <div
                          className="btn-icon btn btn-theme"
                          onClick={() => handleAddToCart(veggie)}
                        >
                          <i className="fas fa-shopping-bag"></i>
                        </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="pb-4 entity-content">
                      <h4 className="entity-title">
                        <div className="content-link">
                          {veggie.name} {veggie.tel_name}
                        </div>
                      </h4>
                      <div className="entity-price">
                        <span className="currency">Rs.</span>
                        {veggie.price}
                        <span className="price-unit"> / kg</span>
                        <span className="entity-price-old">
                          Rs. {veggie.actual_price}
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>
            ))}
          {/* <div className="col-sm-6 col-lg-4">
            <article className="entity-block entity-hover-shadow text-center entity-preview-show-up">
              <div className="entity-preview">
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    className="embed-responsive-item"
                    src="assets/images/content/720x540/pepper.jpg"
                    alt=""
                  />
                </div>
                <div className="with-back entity-preview-content">
                  <div className="mx-auto mt-auto mb-4 text-center">
                    <a
                      className="btn-wide mr-2 btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      buy now
                    </a>
                    <a
                      className="btn-icon btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pb-4 entity-content">
                <h4 className="entity-title">
                  <a
                    className="content-link"
                    href="shop-product-sidebar-right.html"
                  >
                    Pepper
                  </a>
                </h4>
                <div className="entity-price">
                  <span className="currency">$</span>3.50{" "}
                  <span className="price-unit">/ kg</span>
                </div>
              </div>
            </article>
          </div>
          <div className="col-sm-6 col-lg-4">
            <article className="entity-block entity-hover-shadow text-center entity-preview-show-up">
              <div className="entity-preview">
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    className="embed-responsive-item"
                    src="assets/images/content/720x540/tomato.jpg"
                    alt=""
                  />
                </div>
                <div className="with-back entity-preview-content">
                  <div className="mx-auto mt-auto mb-4 text-center">
                    <a
                      className="btn-wide mr-2 btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      buy now
                    </a>
                    <a
                      className="btn-icon btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pb-4 entity-content">
                <h4 className="entity-title">
                  <a
                    className="content-link"
                    href="shop-product-sidebar-right.html"
                  >
                    Tomato
                  </a>
                </h4>
                <div className="entity-price">
                  <span className="currency">$</span>3.29{" "}
                  <span className="price-unit">/ kg</span>
                </div>
              </div>
            </article>
          </div>
          <div className="col-sm-6 col-lg-4">
            <article className="entity-block entity-hover-shadow text-center entity-preview-show-up">
              <div className="entity-preview">
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    className="embed-responsive-item"
                    src="assets/images/content/720x540/red-pepper.jpg"
                    alt=""
                  />
                </div>
                <div className="with-back entity-preview-content">
                  <div className="mx-auto mt-auto mb-4 text-center">
                    <a
                      className="btn-wide mr-2 btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      buy now
                    </a>
                    <a
                      className="btn-icon btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pb-4 entity-content">
                <h4 className="entity-title">
                  <a
                    className="content-link"
                    href="shop-product-sidebar-right.html"
                  >
                    Red pepper
                  </a>
                </h4>
                <div className="entity-price">
                  <span className="currency">$</span>8.50{" "}
                  <span className="price-unit">/ kg</span>
                </div>
              </div>
            </article>
          </div>
          <div className="col-sm-6 col-lg-4">
            <article className="entity-block entity-hover-shadow text-center entity-preview-show-up">
              <div className="entity-preview">
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    className="embed-responsive-item"
                    src="assets/images/content/720x540/banana.jpg"
                    alt=""
                  />
                </div>
                <div className="with-back entity-preview-content">
                  <div className="mx-auto mt-auto mb-4 text-center">
                    <a
                      className="btn-wide mr-2 btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      buy now
                    </a>
                    <a
                      className="btn-icon btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pb-4 entity-content">
                <h4 className="entity-title">
                  <a
                    className="content-link"
                    href="shop-product-sidebar-right.html"
                  >
                    Banana
                  </a>
                </h4>
                <div className="entity-price">
                  <span className="currency">$</span>3.99{" "}
                  <span className="price-unit">/ kg</span>
                </div>
              </div>
            </article>
          </div>
          <div className="col-sm-6 col-lg-4">
            <article className="entity-block entity-hover-shadow text-center entity-preview-show-up">
              <div className="entity-preview">
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    className="embed-responsive-item"
                    src="https://res.cloudinary.com/dpfugowzy/image/upload/v1624859644/pepper_utfhbv.jpg"
                    alt=""
                  />
                </div>
                <div className="with-back entity-preview-content">
                  <div className="mx-auto mt-auto mb-4 text-center">
                    <a
                      className="btn-wide mr-2 btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      buy now
                    </a>
                    <a
                      className="btn-icon btn btn-theme"
                      href="shop-sidebar-right.html"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pb-4 entity-content">
                <h4 className="entity-title">
                  <a
                    className="content-link"
                    href="shop-product-sidebar-right.html"
                  >
                    Potato
                  </a>
                </h4>
                <div className="entity-price">
                  <span className="currency">$</span>1.80{" "}
                  <span className="price-unit">/ kg</span>
                </div>
              </div>
            </article>
          </div> */}
        </div>
      </div>
      <div className="section-footer">
        <a className="btn-theme-white-bordered btn" href="/veggies/shop">
          View all
        </a>
      </div>
    </section>
  );
};

export default OurProducts;
