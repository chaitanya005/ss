import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components/macro"; //eslint-disable-line
import {
  Container,
  ContentWithPaddingXl,
} from "./TestmonialsAssets/Layouts.js";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "./TestmonialsAssets/Headings.js";
import { SectionDescription } from "./TestmonialsAssets/Typography.js";

const HeadingContainer = tw.div``;
// export const HeadingContainer = () => <div tw="" />;
const Subheading = tw(SubheadingBase)`text-center text-gray-100 mb-4`;
const Heading = tw(SectionHeading)``;
const Description = tw(SectionDescription)`mx-auto text-center text-gray-300`;

const TestimonialsSlider = styled(Slider)`
  ${tw`flex mt-16 mx-auto max-w-xs sm:max-w-xl lg:max-w-4xl text-left bg-gray-100 rounded-lg text-gray-900`}
  .slick-track {
    ${tw`flex!`}
  }
  .slick-slide {
    ${tw`h-auto`}
  }
  .slick-slide > div {
    ${tw`h-full`}
  }
`;
const Testimonial = tw.div`px-6 py-12 sm:px-20 sm:py-16 focus:outline-none flex! flex-col justify-between h-full`;
// export const Testimonial = () => (
// <div tw="px-6 py-12 sm:px-20 sm:py-16 focus:outline-none flex! flex-col justify-between h-full" />
// );
const QuoteContainer = tw.div`relative`;
// export const QuoteContainer = () => <div tw="relative" />;

// const QuoteIcon = tw(
//   QuoteIconBase
// )`absolute opacity-100 top-0 left-0 transform -translate-y-2 -translate-x-1/2 sm:-translate-x-full w-10 fill-current text-blue-500`;
const Quote = tw.blockquote`font-medium sm:font-normal relative text-sm sm:text-xl text-center sm:text-left`;
const CustomerInfoAndControlsContainer = tw.div`mt-8 flex items-center flex-col sm:flex-row justify-center text-center sm:text-left`;
const CustomerImage = tw.img`w-16 h-16 rounded-full`;
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-4 flex flex-col`;
const CustomerName = tw.span`text-lg font-semibold`;
const CustomerProfile = tw.span`text-sm font-normal text-gray-700`;
const ControlsContainer = tw.div`sm:ml-auto flex`;
const ControlButton = styled.button`
  ${tw`text-gray-600 hover:text-blue-700 focus:outline-none transition-colors duration-300 ml-4 first:ml-0 sm:first:ml-4 mt-4 sm:mt-0`}
  .icon {
    ${tw`fill-current w-6`}
  }
`;

/* const Testimonials = () => {
    return (
        <section className="section" data-slider="testimonials">
            <div className="section-head container left">
                <div className="section-icon"><span className="svg-fill-crimson svg-content"
                        data-svg="assets/images/svg/title-strawberry.svg"></span></div>
                <div className="section-head-content">
                    <h2 className="section-title">What our costumers are seying</h2>
                </div>
                
            </div>
        </section>
    )
} */

let subheading = "";
// let heading = "Testimonials"
// let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

const testimonials = [
  {
    customerName: "Miguel",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    customerName: "Morales",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];

const Testimonials = () => {
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <section
      className="testimonial text-center"
      // style={{ backgroundColor: "#151853", textAlign: "center" }}
    >
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <div
            className="section-heading-2 text-center wow fadeInUp"
            data-wow-delay="300ms"
          >
            <p></p>
            <h4>What our Customers are Saying</h4>
          </div>
        </HeadingContainer>
        <TestimonialsSlider arrows={false} ref={setSliderRef}>
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index}>
              <QuoteContainer>{testimonial.quote}</QuoteContainer>
              <CustomerInfoAndControlsContainer>
                {/* <CustomerImage src={testimonial.imageSrc} /> */}
                <CustomerNameAndProfileContainer>
                  <CustomerName>{testimonial.customerName}</CustomerName>
                  {/* <CustomerProfile>
                      {testimonial.customerProfile}
                    </CustomerProfile> */}
                </CustomerNameAndProfileContainer>
                <ControlsContainer>
                  <div></div>
                  <i
                    className="fa fa-arrow-left"
                    onClick={sliderRef?.slickPrev}
                    style={{
                      paddingRight: "20px",
                      fontSize: "18px",
                      color: "#5011CC",
                    }}
                  ></i>
                  <i
                    className="fa fa-arrow-right"
                    onClick={sliderRef?.slickNext}
                    style={{ fontSize: "18px", color: "#5011CC" }}
                  ></i>
                </ControlsContainer>
              </CustomerInfoAndControlsContainer>
            </Testimonial>
          ))}
        </TestimonialsSlider>
      </ContentWithPaddingXl>
    </section>
  );
};

export default Testimonials;
