import React from "react";
import HomePage from "./Homepage";
import OurProducts from "./OurProducts";
import Testimonials from "./Testimonials";
import { Helmet } from "react-helmet";

const VeggiesLandingPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Spont Store | Veggies</title>
      </Helmet>
      <HomePage />
      <OurProducts />
      {/* <Testimonials /> */}
    </React.Fragment>
  );
};

export default VeggiesLandingPage;
