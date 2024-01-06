import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { getUserUid } from "../../features/user/userSlice";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { addToCart, storeCart } from "../../features/cart/cart";
import { useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductPage = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  const dispatch = useDispatch();
  const [veggie, setVeggie] = useState("");
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const [updtedPrice, setUpdatedPrice] = useState(0);

  const userId = useSelector(getUserUid);
  const oldCartItems = useSelector(storeCart);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [addItem, setAddItem] = useState(false);

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (id) {
      db.collection("veggies")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) setVeggie(doc.data());
          setUpdatedPrice(doc.data().price);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(err);
        });
    }
    // console.log(addItem);
  }, [id, userId, addItem]);

  let p;

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setUpdatedPrice((prev) => prev - veggie.price);
    }
    if (qty === 1) {
      setQty(qty - 0.5);
      p = Math.ceil(veggie.price / 2);
      setUpdatedPrice(p);
    }
  };

  const handleIncrement = () => {
    if (qty < 5) {
      setQty(qty + 1);
      setUpdatedPrice((prev) => prev + veggie.price);
    }
    if (qty === 0.5) {
      setQty(qty + 0.5);
      setUpdatedPrice(veggie.price);
    }
  };

  // let newItem = [];

  const [newItem, setNewItem] = useState([]);

  useEffect(() => {
    if (newItem.length > 0) {
      dispatch(
        addToCart({
          newItem,
        })
      );
    }
  }, [newItem]);

  const handleAddToCart = async (veggie) => {
    // console.log(veggie);
    setNewItem([
      ...newItem,
      { veggieId: id, newPrice: updtedPrice, qty: qty, ...veggie },
    ]);

    // console.log(newItem);
    /* if (userId) {
      let veggieId = id;

      const cartRef = firestore.doc(`cart/${veggieId}`);
      const snapshot = await cartRef.get();

      if (!snapshot.exists) {
        const info = veggie.desc;
        const prod_img = veggie.img;
        const prod_name = veggie.name;
        const prod_price = price;
        const prod_id = veggieId;
        const uid = userId;
        const actual_cost = veggie.actual_price;
        const quantity = qty;

        try {
          cartRef
            .set({
              prod_img,
              info,
              prod_id,
              prod_name,
              prod_price,
              uid,
              actual_cost,
              quantity,
            })
            .then(() => {
              setAddItem(true);
              setState({ ...state, open: true });
              setQty(1);
              // console.log("item added succesfully");
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log("Error in adding product to cart", error);
        }
      }
    } */

    setTimeout(() => {
      setAddItem(true);
      setState({ ...state, open: true });
    }, 1000);

    // else console.log("please logIn");
  };

  return (
    <React.Fragment>
      {!loading ? (
        <>
          <section
            className="
        after-head
        top-block-page
        with-back
        white-curve-after
        section-white-text
      "
          >
            <div className="overflow-back">
              <BgImage
                className="overflow-back cover-image mw-100 bgImage"
                data-background="assets/images/content/1920x1080/antioxidant-carrot-diet-33307.jpg"
              ></BgImage>
              <div className="overflow-back bg-body-back opacity-70"></div>
            </div>
            <div className="content-offs-stick my-5 container">
              <div className="section-solid">
                <div className="z-index-4 position-relative">
                  <h1
                    className="section-title"
                    style={{ textTransform: "capitalize" }}
                  >
                    {veggie.name}
                  </h1>
                  <div className="mt-3">
                    <div className="page-breadcrumbs">
                      <a className="content-link" href="/veggies">
                        Home
                      </a>
                      <span className="mx-2">\</span>
                      <a className="content-link" href="/shop/veggies">
                        Shop
                      </a>
                      <span className="mx-2">\</span>
                      <span>Product</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-center section">
            <div className="container">
              <div className="entity">
                <div className="grid col-auto px-0 row">
                  <div className="col-md-6">
                    <div className="position-relative entity-image">
                      <img className="w-100" src={veggie.img} alt="" />
                      {/* <div className="full-block">
                    <a
                      className="
                      position-bottom position-right
                      mr-3
                      mb-3
                      btn-icon btn btn-theme
                    "
                      href="shop-sidebar-right.html"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div> */}
                    </div>
                  </div>
                  <div className="col">
                    <h2
                      className="mb-2 entity-title"
                      style={{ textTransform: "capitalize" }}
                    >
                      {veggie.name}
                    </h2>
                    {/* <div className="user-rating mb-1">
                  <span className="rating-item">
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="rating-item">
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="rating-item">
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="rating-item">
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="rating-item">
                    <i className="fas fa-star"></i>
                  </span>
                </div> */}
                    <div className="mb-3 entity-price">
                      <span className="entity-price-current">
                        Rs. {updtedPrice}
                      </span>
                      <span className="entity-price-old">
                        Rs. {veggie.actual_price}
                      </span>
                    </div>
                    <div className="entity-action-btns">
                      <form autoComplete="off">
                        <div className="row grid">
                          <div className="col-auto">
                            <div
                              className="
                          input-view-flat
                          input-gray-shadow
                          input-spin
                          input-group
                        "
                            >
                              <input
                                className="form-control"
                                min="1"
                                name="text"
                                type="text"
                                value={qty}
                              />
                              {/* <select>
                            <option>1/2 Kilo</option>
                            <option>1 Kilo</option>
                            <option>2 Kilo</option>
                            <option>3 Kilo</option>
                            <option>4 Kilo</option>
                            <option>5 Kilo</option>
                          </select> */}
                              <span className="input-actions">
                                <span
                                  className="input-decrement"
                                  onClick={handleDecrement}
                                >
                                  <i className="fas fa-minus"></i>
                                </span>
                                <span
                                  className="input-increment"
                                  onClick={handleIncrement}
                                >
                                  <i className="fas fa-plus"></i>
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="col-auto col-lg">
                            <div
                              className="btn btn-theme"
                              // type="submit"
                              onClick={() => handleAddToCart(veggie)}
                            >
                              Add to cart
                            </div>
                            {/* userId ? (
                              <div
                                className="btn btn-theme"
                                // type="submit"
                                onClick={() => handleAddToCart(veggie)}
                              >
                                add to cart
                              </div>
                            ) : (
                              
                            ) */}
                          </div>
                        </div>
                      </form>
                    </div>
                    {/*  <ul className="mt-4 entity-list">
                  <li>
                    <span className="entity-list-title">SKU:</span>
                    <span className="entity-list-value">1245</span>
                  </li>
                  <li>
                    <span className="entity-list-title">Categories:</span>
                    <span className="entity-list-value">
                      <span className="entity-categories">
                        <a href="article-sidebar-right.html">fruits</a>,
                        <a href="article-sidebar-right.html">fresh</a>
                      </span>
                    </span>
                  </li>
                </ul> */}
                  </div>
                </div>
                <div className="mb-4 entity-body">
                  <p>{veggie.desc}</p>
                </div>
                <ul className="font-weight-semibold entity-details-list">
                  <li>100% Fresh, Not Chemicals</li>
                </ul>
              </div>
            </div>
          </section>

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Please  Login"
            key={vertical + horizontal}
            // style={{ background: "#fff", color: "#000" }}
          >
            {!addItem ? (
              <Alert severity="error" onClose={handleClose}>
                Please Login!
              </Alert>
            ) : (
              <Alert severity="success" onClose={handleClose}>
                Item added Successfully
              </Alert>
            )}
          </Snackbar>
        </>
      ) : (
        "Loading...."
      )}
    </React.Fragment>
  );
};

const BgImage = styled.div`
  background-image: url("/assets/images/content/1920x1080/antioxidant-carrot-diet-33307.jpg");
`;

export default ProductPage;
