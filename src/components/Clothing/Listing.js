import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Listing = ({ shirt }) => {
  return (
    <div
      className="col-6 col-sm-4"
      // key={shirt.clothingId}
      href={`/product?id=${shirt.clothingId}`}
    >
      <div className="product-default inner-quickview inner-icon">
        <figure>
          <a href={`/product?id=${shirt.clothingId}`}>
            <img src={shirt.img} alt="" style={{ borderRadius: "5px" }} />
          </a>
          <div className="label-group">
            <div
              className="product-label label-hot"
              // style={{ backgroundColor: "#62b959" }}
            >
              -20%
            </div>
            <div
              className="product-label label-sale"
              // style={{ backgroundColor: "#e27c7c" }}
            >
              -20%
            </div>
          </div>
          {/* <div className="btn-icon-group">
            <button
              className="btn-icon btn-add-cart"
              data-toggle="modal"
              data-target="#addCartModal"
              // onClick={() => handleAddToCart(shirt)}
            >
              <LocalMallIcon />
            </button>
          </div> */}
          -
          <a
            href={`/product?id=${shirt.clothingId}`}
            className="btn-quickview"
            title="Quick View"
            style={{ borderRadius: "0px 0px 5px 5px" }}
          >
            Quick View
          </a>
        </figure>
        <div className="product-details">
          <div className="category-wrap">
            <div className="category-list">
              <a href="#/" className="product-category">
                {shirt.categoryType}
              </a>
            </div>
            <a href="#/" className="btn-icon-wish">
              <FavoriteBorderIcon />
            </a>
          </div>
          <h2 className="product-title">
            <a href={`/product?id=${shirt.clothingId}`}>{shirt.name}</a>
          </h2>
          <div className="price-box">
            <span className="old-price">Rs.{shirt.actual_price}</span>
            <span
              className="product-price"
              style={{
                fontWeight: "800",
                fontSize: "1.5rem",
              }}
            >
              Rs.{shirt.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
