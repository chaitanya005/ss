import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import {
  setUser,
  setSignOut,
  getUserName,
  getUserPhoto,
  getUserUid,
  getUserNumber,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { createUserDocument } from "../firebase";
import { removeCart } from "../features/cart/cart";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Divider,
  Snackbar,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  ListItemText,
  ListItem,
  List,
  Drawer,
  makeStyles,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { removeOrders } from "../features/order";
import { Helmet } from "react-helmet";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    display: "block",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: 240,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(getUserName);
  const userPhoto = useSelector(getUserPhoto);
  const uId = useSelector(getUserUid);
  const userNumber = useSelector(getUserNumber);

  const [menanchorEl, setMenAnchorEl] = React.useState(null);
  const [womenanchorEl, setWomenAnchorEl] = React.useState(null);
  const [kidsanchorEl, setKidsAnchorEl] = React.useState(null);
  const [veggieanchorEl, setVeggieAnchorEl] = React.useState(null);
  const [foodanchorEl, setFoodAnchorEl] = React.useState(null);

  /* useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                saveUser(user)
                history.push('/home')
            }
        })
    }, [userName]) */

  // const open = Boolean(anchorEl);

  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    openToast: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openToast } = state;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAuth = () => {
    if (!userName) {
      history.push("/login");
      /* auth
        .signInWithPopup(provider)
        .then((res) => {
          // console.log(res);
          auth
            .signInWithCredential(res.credential)
            .then(async (res) => {
              saveUser(res.user);
              await createUserDocument(res.user);
              history.push("/checkout");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {}); */
    } else {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOut());
          dispatch(removeOrders());
          // dispatch(removeCart());
          // history.push("/");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setSignOut());
        dispatch(removeOrders());
        // dispatch(removeCart());
        // history.push("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const saveUser = (user) => {
    dispatch(
      setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
        phoneNumber: "",
      })
    );
  };

  const handleClose = () => {
    setState({ ...state, openToast: false });
  };

  const handleToastOpen = () => {
    setState({ ...state, openToast: true });
  };

  const handleMenPopoverOpen = (event) => {
    setMenAnchorEl(event.currentTarget);
  };

  const handleMenPopoverClose = () => {
    setMenAnchorEl(null);
  };

  const handleWomenPopoverOpen = (event) => {
    setWomenAnchorEl(event.currentTarget);
  };

  const handleWomenPopoverClose = () => {
    setWomenAnchorEl(null);
  };

  const handleKidsPopoverOpen = (event) => {
    setKidsAnchorEl(event.currentTarget);
  };

  const handleKidsPopoverClose = () => {
    setKidsAnchorEl(null);
  };

  const handleVeggiePopoverOpen = (event) => {
    setVeggieAnchorEl(event.currentTarget);
  };

  const handleVeggiePopoverClose = () => {
    setVeggieAnchorEl(null);
  };

  const handleFoodPopoverOpen = (event) => {
    setFoodAnchorEl(event.currentTarget);
  };

  const handleFoodPopoverClose = () => {
    setFoodAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Helmet>
        <style>{`
        .signout{ 
          display: flex
        }
        @media (max-width: 768px) {
          .signout {
            display: none;
          }
        }
      `}</style>
      </Helmet>
      {/* ------------------------------------- Mobile Bar ------------------------------------ */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div style={{ display: "flex" }}>
          <Logo href="/">
            <img
              src="/images/svg/black_logo.svg"
              alt="spontstore"
              style={{ width: "150px", marginTop: "11%", marginLeft: "-15%" }}
            />
          </Logo>
          <div className={classes.drawerHeader} style={{ marginTop: "7%" }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </div>

        <List>
          <ListItem>
            <a href="/">
              <ListItemText primary="Home" />
            </a>
          </ListItem>
          <ListItem>
            <Typography
              aria-owns={menanchorEl ? "men" : undefined}
              aria-haspopup="true"
              onClick={handleMenPopoverOpen}
              onMouseOver={handleMenPopoverOpen}
            ></Typography>
          </ListItem>

          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <span>MEN</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Shirts
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Pants
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  T-Shirts
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Shirt + Pant
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion> */}

          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                <span>Women</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Shirts & T-shirts
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Pants
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Punjabi Dresses
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Duppata's & Scarfs
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Lehanga's
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Night Wear
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion> */}

          {/*  <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                <span>Kids</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Boys
                </Link>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <Link to="" style={{ color: "#000" }} onClick={handleToastOpen}>
                  Girls
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion> */}
          <ListItem>
            <a href="/shop/sarees">
              <ListItemText primary="Sarees" />
            </a>
          </ListItem>

          <ListItem>
            <a href="/dryfruits">
              <ListItemText primary="Dry Fruits" />
            </a>
          </ListItem>

          {/* <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Vegetables</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <a href="/veggies" style={{ color: "#000" }}>
                  Veggies
                </a>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography>
                <a href="/veggies/shop" style={{ color: "#000" }}>
                  Veggies Shop
                </a>
              </Typography>
            </AccordionDetails>
            <Divider />
          </Accordion> */}

          <ListItem>
            <a href="/cart">
              <ListItemText primary="Cart" />
            </a>
          </ListItem>

          <Divider />
          <ListItem>
            <a href="/user/orders">
              <ListItemText primary="Your Orders" />
            </a>
          </ListItem>

          <ListItem>
            {!uId ? (
              <a href="/login">
                <ListItemText primary="Login" />
              </a>
            ) : (
              <div onClick={signOut}>
                <ListItemText primary="Sign Out" />
              </div>
            )}
          </ListItem>
        </List>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openToast}
          onClose={handleClose}
          // message="Please  Login"
          key={vertical + horizontal}
          // style={{ background: "#fff", color: "#000" }}
        >
          <Alert severity="info" onClose={handleClose}>
            Coming Soon
          </Alert>
        </Snackbar>
      </Drawer>

      {/* ------------------------------------- Mobile Bar End ------------------------------------ */}

      <Nav>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <>
          <NavMenu>
            <Logo href="/">
              <img
                src="/images/svg/logo.svg"
                alt="spontstore"
                style={{ width: "100%", height: "100%" }}
              />
            </Logo>
            {/* <a href="/home" style={{ fontSize: "16px" }}>
              <img src="/images/home-icon.svg" alt="Home" /> 
              <span>HOME</span>
            </a> */}

            <Typography
              // aria-owns={menanchorEl ? "men" : undefined}
              aria-haspopup="true"
              // onClick={handleMenPopoverOpen}
              // onMouseOver={handleMenPopoverOpen}
            >
              <a href="/">
                <span>HOME</span>
              </a>
            </Typography>

            <Typography
              // aria-owns={menanchorEl ? "men" : undefined}
              aria-haspopup="true"
              // onClick={handleMenPopoverOpen}
              // onMouseOver={handleMenPopoverOpen}
            >
              <a href="/shop/sarees">
                <span>SAREES</span>
              </a>
            </Typography>

            <Typography
              // aria-owns={menanchorEl ? "men" : undefined}
              aria-haspopup="true"
              // onClick={handleMenPopoverOpen}
              // onMouseOver={handleMenPopoverOpen}
            >
              <a href="/dryfruits">
                <span>DRY FRUITS</span>
              </a>
            </Typography>

            {/* <Menu
              id="men"
              anchorEl={menanchorEl}
              open={Boolean(menanchorEl)}
              onClose={handleMenPopoverClose}
              MenuListProps={{ onMouseLeave: handleMenPopoverClose }}
              style={{ top: "5%" }}
            >
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Shirts
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Pants
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  T-shirts
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Shirt + Pant
                </Link>
              </MenuItem>
            </Menu> */}

            {/* <Typography
              aria-owns={menanchorEl ? "men" : undefined}
              aria-haspopup="true"
              onClick={handleMenPopoverOpen}
              onMouseOver={handleMenPopoverOpen}
            >
              <a href="">
                <span>MEN</span>
              </a>
            </Typography> */}

            {/* <Menu
              id="women"
              anchorEl={womenanchorEl}
              open={Boolean(womenanchorEl)}
              onClose={handleWomenPopoverClose}
              MenuListProps={{ onMouseLeave: handleWomenPopoverClose }}
              style={{ top: "5%" }}
            >
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Shirts & T-shirts
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Pants
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Punjabi Dresses
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Sarees
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Duppata's & Scarfs
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Lehanga's
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Night Wear
                </Link>
              </MenuItem>
            </Menu> */}

            {/* <Typography
              aria-owns={womenanchorEl ? "women" : undefined}
              aria-haspopup="true"
              onClick={handleWomenPopoverOpen}
              onMouseOver={handleWomenPopoverOpen}
            >
              <a href="">
                <span>WOMEN</span>
              </a>
            </Typography>
 */}
            {/* <Menu
              id="kids"
              anchorEl={kidsanchorEl}
              open={Boolean(kidsanchorEl)}
              onClose={handleKidsPopoverClose}
              MenuListProps={{ onMouseLeave: handleKidsPopoverClose }}
              style={{ top: "5%" }}
            >
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Boy
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" onClick={handleToastOpen}>
                  Girl
                </Link>
              </MenuItem>
            </Menu>
 */}
            {/* <Typography
              aria-owns={kidsanchorEl ? "kids" : undefined}
              aria-haspopup="true"
              onClick={handleKidsPopoverOpen}
              onMouseOver={handleKidsPopoverOpen}
            >
              <a href="">
                <span>KIDS</span>
              </a>
            </Typography> */}

            {/* <Typography
              aria-owns={veggieanchorEl ? "veggies" : undefined}
              aria-haspopup="true"
              onClick={handleVeggiePopoverOpen}
              onMouseOver={handleVeggiePopoverOpen}
            >
              <a href="/watchlist">
                <span>VEGETABLES</span>
              </a>
            </Typography>

            <Menu
              id="veggies"
              anchorEl={veggieanchorEl}
              open={Boolean(veggieanchorEl)}
              onClose={handleVeggiePopoverClose}
              MenuListProps={{ onMouseLeave: handleVeggiePopoverClose }}
              style={{ top: "5%" }}
            >
              <MenuItem>
                <Link to="/veggies">Veggies</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/veggies/shop">Veggies Shop</Link>
              </MenuItem>
            </Menu> */}

            {/* <Typography
              aria-owns={foodanchorEl ? "food" : undefined}
              aria-haspopup="true"
              onClick={handleFoodPopoverOpen}
              onMouseOver={handleFoodPopoverOpen}
            >
              <a href="/watchlist">
                <span>FOOD DELIVERY</span>
              </a>
            </Typography>

            <Menu
              id="food"
              anchorEl={foodanchorEl}
              open={Boolean(foodanchorEl)}
              onClose={handleFoodPopoverClose}
              MenuListProps={{ onMouseLeave: handleFoodPopoverClose }}
              style={{ top: "5%" }}
            >
              <MenuItem>
                <Link to="/food-delivery">Food</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/food/restaurants">Restaurants</Link>
              </MenuItem>
            </Menu> */}
          </NavMenu>
          <CartIcon>
            <a href="/cart" style={{ color: "#fff" }}>
              <ShoppingCartIcon />
            </a>
          </CartIcon>
          {!uId ? (
            <Login onClick={handleAuth} style={{ color: "#fff" }}>
              Login
            </Login>
          ) : (
            <React.Fragment>
              {/* console.log(uId) */}
              {userName ? (
                <SignOut>
                  <UserImg src={userPhoto} alt={userName} />
                  <DropDown>
                    <a href="/user/orders">Your Orders</a> <br />
                    <span onClick={handleAuth} style={{ color: "#fff" }}>
                      Sign out
                    </span>
                  </DropDown>
                </SignOut>
              ) : (
                <SignOut style={{ width: "auto" }}>
                  <div
                    className="signout"
                    style={{
                      color: "#fff",
                      letterSpacing: "normal",
                      textTransform: "uppercase",
                      // marginLeft: "5px",
                      // width: "100px",
                    }}
                  >
                    Hello, {userNumber}
                  </div>
                  <DropDown>
                    <a href="/user/orders">Your Orders</a> <br />
                    <span onClick={signOut} style={{ color: "#fff" }}>
                      Sign out
                    </span>
                  </DropDown>
                </SignOut>
              )}
              {/* <div className="signout">
                <div
                  style={{
                    color: "#fff",
                    letterSpacing: "normal",
                    textTransform: "uppercase",
                    marginRight: "5px",
                  }}
                >
                  <a href="/user/orders">Your Orders</a>{" "}
                </div>{" "}
                <div
                  style={{
                    color: "#fff",
                    letterSpacing: "normal",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={signOut}
                >
                  Sign Out
                </div>
              </div> */}
            </React.Fragment>
          )}
        </>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openToast}
          onClose={handleClose}
          // message="Please  Login"
          key={vertical + horizontal}
          // style={{ background: "#fff", color: "#000" }}
        >
          <Alert severity="info" onClose={handleClose}>
            Coming Soon
          </Alert>
        </Snackbar>
      </Nav>
    </React.Fragment>
  );
};

const Nav = styled.nav`
  position: fixed;
  height: 70px;
  width: 100%;
  background-color: rgb(52, 58, 64);
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  display: flex;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  width: 200px;
  margin-top: 4px;
  max-height: 70px;
  padding: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const CartIcon = styled.div`
  margin-right: 25px;

  @media (max-width: 770px) {
    margin-left: 45%;
    margin-right: 5px;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgba(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 150px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
