import React, { useEffect } from "react";
import styles from "./Restaurants.module.css";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { storeRestaurants, getStoredRestos } from "../../features/resto";

const PopularBrands = () => {
  const [restos, loading, error] = useCollection(db.collection("restaurants"));
  const dispatch = useDispatch();
  const storedRestos = useSelector(getStoredRestos);

  console.log(storedRestos.restaurants);

  let allRestos = [];

  useEffect(() => {
    restos &&
      restos.docs.map((doc) => {
        // console.log(doc.data());
        let id = doc.id;
        let docu = doc.data();

        allRestos = [...allRestos, { restoId: id, ...docu }];
      });
    dispatch(storeRestaurants({ allRestos }));
  }, [restos]);

  return (
    <section className="bg-light-green white-curve-before curve-before-0 white-curve-after curve-after-40 section-solid">
      <div className="overflow-back bg-vegetables-pattern opacity-10"></div>
      <div className="full-block"></div>
      <div className="section-head container left">
        <div className="section-icon">
          <span
            className="svg-fill-dark-lime-green svg-content"
            data-svg="assets/images/svg/title-kiwi.svg"
          ></span>
        </div>
        <div className="section-head-content">
          <h2 className="section-title">Popular Restaurants</h2>
          <p className="section-text">All the best items for You</p>
        </div>
      </div>
      <div className="container" style={{ marginTop: "3%" }}>
        <div className={styles.mainrow}>
          <div className="">
            <div className={styles.row}>
              {storedRestos.restaurants &&
                storedRestos.restaurants.map((resto) => (
                  <div className="col-md-4 col-sm-6 mb-4 pb-2" key={resto.name}>
                    <a href={`/resto-order?restoId=${resto.restoId}`}>
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
                            <a href={`/resto-order?restoId=${resto.restoId}`}>
                              {/*                   <i className="icofont-heart"></i> */}
                            </a>
                          </div>
                          {/* <div
                      className="member-plan position-absolute"
                      style={{ left: "8px", top: "8px" }}
                    >
                      <span className={styles.badgeDark}>Promoted</span>
                    </div> */}
                          <a href={`/resto-order?restoId=${resto.restoId}`}>
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
                              <a
                                href={`/resto-order?restoId=${resto.restoId}`}
                                className={styles.title}
                              >
                                {resto.name}
                              </a>
                            </h6>
                            <p
                              className="text-gray mb-3"
                              style={{ color: "#747d88" }}
                            >
                              {resto.specialities}
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
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                <i className="icofont-wall-clock"></i> 20–25 min
                              </span>
                              <span
                                className="float-right "
                                style={{ color: "#fff" }}
                              >
                                Rs. {resto.average}
                              </span>
                            </p>
                          </div>
                          <div className="list-card-badge">
                            <span className="badge badge-success"></span>
                            <small style={{ color: "#fff" }}></small>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-footer">
        <a className="btn-theme-white-bordered btn" href="/food/restaurants">
          View all
        </a>
      </div>
    </section>
  );
};

export default PopularBrands;
