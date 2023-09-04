import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import db from "../../firebase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ReactImageMagnify from "react-image-magnify";
import { addToCart } from "../../features/cart/cart";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../features/user/userSlice";
import firestore from "../../firebase";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },

  paper: {
    position: "absolute",
    width: 400,
    color: "#000",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  margin: {
    marginTop: theme.spacing(1),
    width: 200,
    height: 50,
    backgroundColor: "#343A40",

    "&:hover": {
      backgroundColor: "#343A40",
    },
  },

  hover: {
    //   height: '1000px'
    zIndex: 100,
  },
  hover1: {
    zIndex: 1000,
    height: "2000px",
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(1),
    border: "none",
    color: "#000",
    "&:not(:first-child)": {
      borderRadius: "50%",
    },
    "&:first-child": {
      borderRadius: "50%",
    },
    minWidth: "50px",
  },
}))(ToggleButtonGroup);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Product_page = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(getUserDetails);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  const [shirt, setShirt] = useState("");
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [addItem, setAddItem] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    db.collection("men-wear")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) setShirt(doc.data());
      })
      .catch((err) => console.log(err));
  }, [id, addItem]);

  const [alignment, setAlignment] = useState("");
  const classes = useStyles();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // console.log(addItem)

  const handleCart = async (shirt) => {
    let shirtId = id;
    let shirtWithId = { shirtId, ...shirt };
    // console.log(shirtWithId)
    /*  dispatch(addToCart({
            ...currUser, ...shirt
        })) */
    console.log(addItem);

    const cartRef = firestore.doc(`cart/${shirtId}`);

    const snapshot = await cartRef.get();

    if (!snapshot.exists) {
      const info = shirt.info;
      const prod_img = shirt.image;
      const prod_name = shirt.name;
      const prod_price = shirt.cost;
      const prod_type = shirt.categoryType;
      const prod_id = shirtId;
      const uid = currUser.uid;
      const max_qty = shirt.max_qty;
      const actual_cost = shirt.actual_cost;
      const avail_sizes = shirt.avail_sizes;

      try {
        cartRef
          .set({
            info,
            prod_img,
            prod_id,
            prod_name,
            prod_price,
            prod_type,
            uid,
            max_qty,
            actual_cost,
            avail_sizes,
          })
          .then(() => {
            // console.log('thenmetod')
            setAddItem(true);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("Error in adding product to cart", error);
      }
    }
    // axios.post()
  };

  /*   let img = shirt.image
      console.log(img) */
  return (
    <Container>
      {shirt ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginTop: "2%" }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                {/* <img src= {shirt.image} alt="" style={{maxWidth: "100%"}}/> */}
                <ReactImageMagnify
                  className={classes.hover1}
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: shirt.image,
                    },
                    largeImage: {
                      src: shirt.image,
                      width: 1400,
                      height: 2000,
                      sizes: "min-width: 800px",
                      srcSet: "shirt.image 4x",
                    },
                    enlargedImagePosition: "beside",
                    enlargedImageContainerDimensions: {
                      width: "130%",
                      height: "130%",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                {/* <img src= {shirt.image} alt="" style={{maxWidth: "100%"}}/> */}
                <ReactImageMagnify
                  className={classes.hover}
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: shirt.image,
                    },
                    largeImage: {
                      src: shirt.image,
                      width: 1400,
                      height: 2000,
                      sizes: "min-width: 800px",
                      srcSet: "shirt.image 4x",
                    },
                    enlargedImagePosition: "beside",
                    enlargedImageContainerDimensions: {
                      width: "130%",
                      height: "130%",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <H1>{shirt.name}</H1>
                <div style={{ fontSize: "20px", color: "#858D95" }}>
                  {shirt.info}
                </div>
                <br />
                <Divider />
                <Price>Rs.{shirt.cost}</Price>
                <br />
                <H3>Select Size</H3>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <StyledToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                    >
                      <ToggleButton value="exleft" aria-label="exleft aligned">
                        {shirt.avail_sizes[0]}
                      </ToggleButton>
                      {shirt.avail_sizes[1] !== undefined ? (
                        <ToggleButton value="left" aria-label="left aligned">
                          {shirt.avail_sizes[1]}
                        </ToggleButton>
                      ) : (
                        ""
                      )}
                      {shirt.avail_sizes[2] !== undefined ? (
                        <ToggleButton value="center" aria-label="centered">
                          {shirt.avail_sizes[2]}
                        </ToggleButton>
                      ) : (
                        ""
                      )}
                      {shirt.avail_sizes[3] !== undefined ? (
                        <ToggleButton value="right" aria-label="right aligned">
                          {console.log(shirt.avail_sizes[3])}
                          {shirt.avail_sizes[3]}
                        </ToggleButton>
                      ) : (
                        ""
                      )}
                      {shirt.avail_sizes[4] !== undefined ? (
                        <ToggleButton value="justify" aria-label="justified">
                          {shirt.avail_sizes[4]}
                        </ToggleButton>
                      ) : (
                        ""
                      )}
                    </StyledToggleButtonGroup>
                  </div>
                  {/* <div>
                                    <button onClick={handleOpen}>Size chart</button>

                                    <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    >
                                        <div style={modalStyle} className={classes.paper}>
                                            <H1 id="simple-modal-title">{shirt.name}</H1>
                                            <table style = {{width: '100%', borderSpacing: '15px'}}>
                                                <tr>
                                                    <th>Label size</th>    
                                                    <th>Chest</th>    
                                                    <th>Shoulder Width</th>    
                                                    <th>Front Length</th>    
                                                </tr>

                                                <tr>
                                                    <td>S</td>
                                                    <td>39.75 Inches | 101 cms</td>
                                                    <td>17 Inches | 43 cms</td>
                                                    <td>28 3/4 Inches | 73 cms</td>

                                                </tr>
                                            </table>
                                        </div>
                                    </Modal>
                                </div> */}
                </div>
                {!addItem ? (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    className={classes.margin}
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleCart(shirt)}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Link to="/cart">
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      className={classes.margin}
                      endIcon={<ArrowRightAltIcon />}
                      // onClick={() => handleCart(shirt)}
                    >
                      Go To Cart
                    </Button>
                  </Link>
                )}
                <br />
                <br />
                <Divider />
                <H3>Product Details</H3>
                <div style={{ color: "#858D95" }}>{shirt.description}</div>
              </Grid>
            </Grid>
          </div>
          <div></div>
        </div>
      ) : (
        "Loading...."
      )}
    </Container>
  );
};

const Container = styled.main`
  // position: absolute;
  top: 80px;
  // min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
  color: #000;
`;

const H1 = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 500;
  margin: 0px;
`;
const H3 = styled.h3`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  margin-top: 5px;
`;

const Price = styled.div`
  color: rgb(40, 44, 63);
  font-size: 24px;
  font-weight: 500;
`;

export default Product_page;
