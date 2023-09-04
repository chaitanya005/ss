import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "../Loading";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, storeCart } from "../../features/cart/cart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Helmet } from "react-helmet";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { saveDryFruits, getDryFruits } from "../../features/dryfruits";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DryFruits = () => {
  const [dryFruits, loading, error] = useCollection(db.collection("dryfruits"));
  const dispatch = useDispatch();

  const storedCartItems = useSelector(storeCart);
  const reduxDryFruits = useSelector(getDryFruits);
  const [isCartItem, setIsCartItem] = useState(false);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let inStockItems = [];

  useEffect(() => {
    dryFruits &&
      dryFruits.docs.map((dryFruit) => {
        if (dryFruit.data().in_stock === true) {
          let docu = dryFruit.data();
          let id = dryFruit.id;

          inStockItems = [...inStockItems, { dryFruitId: id, ...docu }];
        }
      });

    dispatch(
      saveDryFruits({
        inStockItems,
      })
    );
  }, [dryFruits]);

  // console.log(reduxDryFruits);

  const handleAddToCart = (dryFruit) => {
    let inCart = false;
    let newItem = dryFruit;
    // console.log(dryFruit);
    if (storedCartItems.length >= 1) {
      for (let item of storedCartItems) {
        if (item.name === dryFruit.name) {
          setIsCartItem(true);
          setState({ ...state, open: true });
          setTimeout(() => {
            setState({ ...state, open: false });
          }, 1000);
          inCart = true;
          break;
        }
      }

      if (inCart === false) {
        dispatch(
          addToCart({
            newItem,
          })
        );
        setIsCartItem(false);
        setState({ ...state, open: true });
        setTimeout(() => {
          setState({ ...state, open: false });
        }, 1000);
      }
    } else {
      dispatch(
        addToCart({
          newItem,
        })
      );

      setIsCartItem(false);
      setState({ ...state, open: true });

      setTimeout(() => {
        setState({ ...state, open: false });
      }, 1000);
    }
    /* dispatch(
      addToCart({
        newItem,
      })
    ); */
    // setIsCartItem(true);
    // setState({ ...state, open: true });
  };

  return (
    <React.Fragment>
      <Helmet>
        <link
          href="/assets/animate.css/animate.min.css"
          rel="stylesheet"
          type="text/css"
          // rel="preload"
        />
      </Helmet>
      <br />
      {loading ? <Loading /> : ""}
      <div className="container">
        <div className="grid justify-content-center row">
          {reduxDryFruits &&
            reduxDryFruits.storeDryFruit.map((dryFruit) => (
              <div
                // className="col-sm-6 col-md-4 col-lg-3"
                className="col-12 col-md-6 col-xl-4 d-flex"
                key={dryFruit.img}
              >
                {/* bg-white text-center */}
                <article className="entity-block entity-hover-shadow bg-white text-center">
                  {/* my-3 entity-image */}
                  <div
                    className="entity-preview-show-up entity-preview"
                    onClick={() => handleAddToCart(dryFruit)}
                  >
                    <span className="embed-responsive embed-responsive-4by3">
                      <img
                        className="embed-responsive-item"
                        src={dryFruit.img}
                        style={{ cursor: "pointer" }}
                        // src="/images/indian-yellow-raisin-.png"
                        alt=""
                      />
                    </span>
                    <span className="with-back entity-preview-content">
                      <span className="m-auto h1 text-theme text-center">
                        <ShoppingCartIcon style={{ fontSize: "80px" }} />
                      </span>
                      <span className="overflow-back bg-body-back opacity-70"></span>
                    </span>
                  </div>
                  <div
                    className="entity-bg"
                    style={{
                      background: `#${dryFruit.bgColor}`,
                      borderRadius: "0.5rem",
                    }}
                  ></div>
                  <div className="pt-0 entity-content">
                    <h4 className="entity-title">
                      <div
                        className="content-link"
                        style={{ color: "#000", cursor: "pointer" }}
                        onClick={() => handleAddToCart(dryFruit.data())}
                      >
                        {dryFruit.name}
                      </div>
                    </h4>
                    <p className="entity-title" style={{ color: "#000" }}>
                      {dryFruit.desc}
                    </p>
                    <div className="entity-price" style={{ color: "#000" }}>
                      <span
                        className="currency"
                        style={{
                          color: "#000",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs. {dryFruit.actual_price}
                      </span>
                      <span
                        className="price-unit"
                        // style={{ textDecoration: "line-through" }}
                      >
                        / {dryFruit.gms} gms
                      </span>
                      <br />
                      <span className="currency">Rs.</span>
                      {dryFruit.price}
                    </div>
                    <div className="mt-4 entity-action-btns">
                      <button
                        className="btn-wide btn btn-theme"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAddToCart(dryFruit)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        // message="Please  Login"
        key={vertical + horizontal}
        // style={{ background: "#fff", color: "#000" }}
      >
        {isCartItem ? (
          <Alert severity="error" onClose={handleClose}>
            Item Already in Cart
          </Alert>
        ) : (
          <Alert severity="success" onClose={handleClose}>
            Item Added to Cart
          </Alert>
        )}
      </Snackbar>
    </React.Fragment>
  );
};

export default DryFruits;
