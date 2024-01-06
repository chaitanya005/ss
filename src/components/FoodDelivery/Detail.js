import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green, yellow, grey } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Helmet } from "react-helmet";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import db from "../../firebase";
// import { storeMenuItems, getStoredMenuItems } from "../../features/restomenu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addToCart, storeCart } from "../../features/cart/cart";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Detail = () => {
  const search = useLocation().search;
  const restoId = new URLSearchParams(search).get("restoId");
  // console.log(id);

  const [state, setState] = React.useState({
    nonVeg: false,
    veg: false,
    egg: false,
  });

  const [menu, loading, error] = useCollection(
    db.collection("restaurants").doc(restoId).collection("menu")
  );

  const [restoInfo] = useDocument(db.collection("restaurants").doc(restoId));

  /* restoInfo &&
    restoInfo.docs.map((doc) => {
      console.log(doc.data());
    }); */
  // console.log(restoInfo && restoInfo.data());

  const dispatch = useDispatch();
  const storedCartItems = useSelector(storeCart);
  const [isCartItem, setIsCartItem] = useState(false);

  const [toaststate, setToastState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = toaststate;

  // const storedMenuItems = useSelector(getStoredMenuItems);
  // console.log(storedMenuItems.menuItems);

  const [cates, setCategory] = useState({});
  // console.log(cates);
  let restoMenuItems = [];

  useEffect(() => {
    menu &&
      menu.docs.map((doc) => {
        // console.log(doc.data());
        let id = doc.id;

        let obj, docu;

        docu = doc.data();

        restoMenuItems = [...restoMenuItems, { menuItemId: id, ...docu }];

        if (id === "Categories") {
          obj = { ...doc.data() };
          // console.log(doc.data());
          setCategory(obj);
        }
      });

    /* dispatch(
      storeMenuItems({
        restoMenuItems,
      })
    ); */

    // console.log(restoId);
  }, [menu]);

  const VegSwitch = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: green[500],
      },
      "&$checked + $track": {
        backgroundColor: green[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const EggSwitch = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: yellow[500],
      },
      "&$checked + $track": {
        backgroundColor: yellow[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClose = () => {
    setToastState({ ...toaststate, open: false });
  };

  const handleAddToCart = (menuItem) => {
    let inCart = false;
    let newItem = { ...menuItem.data(), id: menuItem.id };
    if (storedCartItems.length >= 1) {
      for (let item of storedCartItems) {
        if (item.id === menuItem.id) {
          setIsCartItem(true);
          setToastState({ ...toaststate, open: true });
          setTimeout(() => {
            setToastState({ ...toaststate, open: false });
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
        setToastState({ ...toaststate, open: true });
        setTimeout(() => {
          setToastState({ ...toaststate, open: false });
        }, 1000);
      }
    } else {
      dispatch(
        addToCart({
          newItem,
        })
      );

      setIsCartItem(false);
      setToastState({ ...toaststate, open: true });
      setTimeout(() => {
        setToastState({ ...toaststate, open: false });
      }, 1000);
    }
  };

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
          // rel="preload"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
          rel="stylesheet"
          type="text/css"
          // rel="preload"
          as="font"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          type="text/css"
          // rel="preload"
          as="font"
        />
        <link href="vendor/icofont/icofont.min.css" rel="stylesheet" />
      </Helmet>
      <style>
        {`
            body {
                background-color: #f3f7f8;
                color: #000;
            }
        `}
      </style>
      <section
        className="
    after-head
    top-block-page
    with-back
    section-white-text
  "
      >
        <div className="overflow-back">
          <div
            className="overflow-back cover-image mw-100"
            data-background="assets/images/content/1920x1080/antioxidant-carrot-diet-33307.jpg"
            style={{
              backgroundImage:
                "url(https://b.zmtcdn.com/data/pictures/0/19805560/41eb316ca3f559dc5899d3350d714abb.jpeg?fit=around|771.75:416.25&crop=771.75:416.25;*,*)",
            }}
          ></div>
          <div className="overflow-back bg-body-back opacity-70"></div>
        </div>
        <div className="content-offs-stick my-5 container">
          <div className="section-solid">
            <div className="z-index-4 position-relative">
              <h1 className="section-title">
                {restoInfo && restoInfo.data().name}
              </h1>
              <h4 className="section-title">
                {restoInfo && restoInfo.data().specialities}
              </h4>
              <div className="mt-3">
                <div className="page-breadcrumbs">
                  <a className="content-link" href="/">
                    Home
                  </a>
                  <span className="mx-2">\</span>
                  <a className="content-link" href="/shop/veggies">
                    Food-Delivery
                  </a>
                  <span className="mx-2">\</span>
                  <span>{restoInfo && restoInfo.data().name}</span>
                </div>
                <div className="page-breadcrumbs">
                  {restoInfo && restoInfo.data().address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="offer-dedicated-body-left">
                <FormControlLabel
                  control={
                    <VegSwitch
                      checked={state.veg}
                      onChange={handleChange}
                      name="veg"
                    />
                  }
                  label="Veg"
                />
                {/* <FormControlLabel
                  control={
                    <Switch
                      checked={state.nonVeg}
                      onChange={handleChange}
                      name="nonVeg"
                    />
                  }
                  label="Non-Veg"
                /> */}
                <FormControlLabel
                  control={
                    <EggSwitch
                      checked={state.egg}
                      onChange={handleChange}
                      name="egg"
                    />
                  }
                  label="Egg"
                />

                <div className="row">
                  <h5 className="mb-4 mt-3 col-md-12">{cates && cates.cat1}</h5>
                  {menu &&
                    menu.docs.map((menuItem) => (
                      <React.Fragment>
                        {cates !== undefined ? (
                          <React.Fragment>
                            {menuItem.data().sub_cat === cates.cat1 ? (
                              <div
                                className="col-md-4 col-sm-6 mb-4"
                                key={menuItem.id}
                              >
                                <div
                                  className="
                                    list-card
                                    bg-white
                                    h-100
                                    rounded
                                    overflow-hidden
                                    position-relative
                                    shadow-sm
                                  "
                                >
                                  <div className="list-card-image">
                                    <a href="#/">
                                      <img
                                        src="/img/list/7.png"
                                        className="img-fluid item-img"
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                  <div className="p-3 position-relative">
                                    <div className="list-card-body">
                                      <h6 className="mb-1">
                                        <a
                                          href="#/"
                                          className="text-black"
                                          style={{ color: "#000" }}
                                        >
                                          {/* console.log(menuItem.data()) */}
                                          {menuItem.data().name}
                                        </a>
                                      </h6>
                                      <p
                                        className="text-gray mb-2"
                                        style={{ color: "#747d88" }}
                                      >
                                        North Indian • Indian
                                      </p>
                                      <p className="text-gray time mb-0">
                                        <a
                                          className="btn btn-link btn-sm pl-0 text-black pr-0"
                                          href="#/"
                                        >
                                          ₹ {menuItem.data().price}
                                        </a>
                                        <span className="float-right">
                                          <div
                                            className="btn btn-outline-secondary btn-sm"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleAddToCart(menuItem)
                                            }
                                          >
                                            ADD
                                          </div>
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    ))}
                </div>

                <div>
                  {/* console.log(cates) */}
                  {Array.from(Array(Object.keys(cates).length), (e, i) => {
                    const orderCates = Object.keys(cates)
                      .sort()
                      .reduce((obj, key) => {
                        obj[key] = cates[key];
                        return obj;
                      }, {});

                    const cat = Object.values(orderCates);
                    if (cat[i] !== "Recommended") {
                      return (
                        <React.Fragment key={i}>
                          <div className="row">
                            <h5 className="mb-4 mt-3 col-md-12">
                              {cat[i] && cat[i]}
                            </h5>

                            <div className="col-md-12">
                              <div
                                className="bg-white rounded border shadow-sm mb-4"
                                // style={{ margin: "0" }}
                              >
                                {menu &&
                                  menu.docs.map((menuItem) => (
                                    <React.Fragment>
                                      {menuItem.data().sub_cat !== undefined &&
                                      menuItem.data().sub_cat.toLowerCase() ===
                                        cat[i].toLowerCase() ? (
                                        <React.Fragment key={menuItem.id}>
                                          <div className="gold-members p-3 border-bottom">
                                            <div
                                              className="btn btn-outline-secondary btn-sm float-right"
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                handleAddToCart(menuItem)
                                              }
                                            >
                                              ADD
                                            </div>
                                            <div className="media">
                                              <div className="mr-3">
                                                <i className="icofont-ui-press text-danger food-item"></i>
                                              </div>
                                              <div className="media-body">
                                                <h6 className="mb-1">
                                                  {menuItem.data().name}{" "}
                                                  <span className="badge badge-success">
                                                    BESTSELLER
                                                  </span>
                                                </h6>
                                                <p
                                                  className="text-gray mb-0"
                                                  style={{ color: "#747d88" }}
                                                >
                                                  ₹ {menuItem.data().price}
                                                </p>
                                                <p
                                                  className="text-gray mb-0"
                                                  style={{ color: "#747d88" }}
                                                >
                                                  {menuItem.data().desc}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </React.Fragment>
                                      ) : (
                                        ""
                                      )}
                                    </React.Fragment>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })}
                </div>

                {/* cates !== undefined && cates.cat2 !== undefined ? (
                  <div className="row">
                    <h5 className="mb-4 mt-3 col-md-12">{cates && cates.cat2}</h5>
                    <div className="col-md-12">
                      <div className="bg-white rounded border shadow-sm mb-4">
                        {menu &&
                          menu.docs.map((menuItem) => (
                            <React.Fragment>
                              <React.Fragment>
                                {menuItem.data().category === cates.cat2 ? (
                                  <div className="gold-members p-3 border-bottom">
                                    <a
                                      className="btn btn-outline-secondary btn-sm float-right"
                                      href="#/"
                                    >
                                      ADD
                                    </a>
                                    <div className="media">
                                      <div className="mr-3">
                                        <i className="icofont-ui-press text-danger food-item"></i>
                                      </div>
                                      <div className="media-body">
                                        <h6 className="mb-1">
                                          {menuItem.data().name}{" "}
                                          <span className="badge badge-success">
                                            BESTSELLER
                                          </span>
                                        </h6>
                                        <p
                                          className="text-gray mb-0"
                                          style={{ color: "#747d88" }}
                                        >
                                          ₹ 75
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </React.Fragment>
                            </React.Fragment>
                          ))}
                        <hr />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                ) */}

                {/* cates !== undefined && cates.cat3 !== undefined ? (
                  <div className="row">
                    <h5 className="mb-4 mt-3 col-md-12">{cates && cates.cat3}</h5>
                    <div className="col-md-12">
                      <div className="bg-white rounded border shadow-sm mb-4">
                        {menu &&
                          menu.docs.map((menuItem) => (
                            <React.Fragment>
                              <React.Fragment>
                                {menuItem.data().category === cates.cat3 ? (
                                  <div className="gold-members p-3 border-bottom">
                                    <a
                                      className="btn btn-outline-secondary btn-sm float-right"
                                      href="#/"
                                    >
                                      ADD
                                    </a>
                                    <div className="media">
                                      <div className="mr-3">
                                        <i className="icofont-ui-press text-danger food-item"></i>
                                      </div>
                                      <div className="media-body">
                                        <h6 className="mb-1">
                                          {menuItem.data().name}{" "}
                                          <span className="badge badge-success">
                                            BESTSELLER
                                          </span>
                                        </h6>
                                        <p
                                          className="text-gray mb-0"
                                          style={{ color: "#747d88" }}
                                        >
                                          ₹ 75
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </React.Fragment>
                            </React.Fragment>
                          ))}
                        <hr />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                ) */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {isCartItem ? (
          <Alert severity="error" onClose={handleClose}>
            Item Already in Cart
          </Alert>
        ) : (
          <Alert severity="success" onClose={handleClose}>
            Item Added Cart
          </Alert>
        )}
      </Snackbar>
    </React.Fragment>
  );
};

export default Detail;
