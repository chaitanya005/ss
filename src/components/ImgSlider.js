import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./style.module.css";

const ImgSlider = () => {
  let settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <React.Fragment>
      <Carousel {...settings}>
        <Wrap>
          <a href="#" className={styles.myBtnClass}>
            <img src="/images/svg/fruit_slide.svg" alt="" />
            <div className={styles.btnOver}>
              <h4> Click here for Dry Fruits!</h4>
            </div>
          </a>
        </Wrap>
        <Wrap>
          <a href="/shop/veggies" className={styles.myBtnClass}>
            <img src="/images/svg/vegie_slide.svg" alt="" />
            <div className={styles.btnOver}>
              {" "}
              <h4>Coming Soon!</h4>
            </div>
          </a>
        </Wrap>
        <Wrap>
          <a href="#" className={styles.myBtnClass}>
            <img src="/images/svg/food_slide.svg" alt="" />
            <div className={styles.btnOver}>
              <h4>Coming Soon!</h4>
            </div>
          </a>
        </Wrap>
      </Carousel>
      {/*<Wrap>
        <a href="#" className={styles.myBtnClass}>
          <img src="/images/women_wear.png" alt="" />
          <h4 className={styles.btnOver}>Women wear Coming Soon</h4>
        </a>
      </Wrap>
      <Wrap>
        <a href="#" className={styles.myBtnClass}>
          <img src="/images/kids.png" alt="" />
          <h4 className={styles.btnOver}>Kid's wear Coming Soon</h4>
        </a>
      </Wrap> */}
    </React.Fragment>
  );
};

const Carousel = styled(Slider)`
  // margin-top: 20px;

  & > button {
    opacity: 0;
    height: 50%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      // height: 0% !important;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgb(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

const BtnOver = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  top: 0px;
  align-items: center;
  justify-content: center;
  color: #ddd;
  font-weight: 600;

  .my-btn-class:hover > .btn-over {
    display: flex;
  }
`;

export default ImgSlider;
