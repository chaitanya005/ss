import React from "react";
import { Helmet } from "react-helmet";
const Blog = () => {
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
        />
        <style>{`
            body {
                color: #000;
            }
        `}</style>
      </Helmet>
      <section
        class="
          after-head
          top-block-page
          with-back
          white-curve-after
          section-white-text
        "
      >
        <div class="overflow-back bg-orange"></div>
        <div class="content-offs-stick my-5 container">
          <div class="section-solid with-back">
            <div class="z-index-4 position-relative text-center">
              <h1 class="section-title">Tips to choose a wedding Saree</h1>
              <div class="mt-3">
                <div class="page-breadcrumbs">
                  <a class="content-link" href="/">
                    Home
                  </a>
                  <span class="mx-2">\</span>
                  <a class="content-link" href="#/">
                    Blog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-center section" style={{ marginTop: "2rem" }}>
        <div class="container">
          <div class="entity">
            <div class="entity-image">
              <img
                class="w-100 mw-100"
                src="/images/wedding_saree.jpeg"
                alt=""
              />
            </div>
            <div class="entity-body">
              <blockquote class="quote-block">
                Not sure how to pick perfect sarees for wedding function? Pick
                them according to your body type to add grace to your overall
                look.
              </blockquote>
              <h4 style={{ color: "#000" }}>
                How To Choose A Splendid Wedding Gown For Your Body Shape?
              </h4>
              <p>
                Finding a perfect wedding dress is always been a stressful task
                for any bride-to-be. It is really hard to choose one from such a
                wide range of designs and Silhouettes available today and dress
                fitness is a major drama when it comes to choosing the perfect
                one. But no need to panic, our gowns are powered by SLIMR! No
                matter what body shape you belong to, be it an apple, a pear or
                a banana you can always turn into the gorgeous hourglass shape!
                Here’s the ultimate guide to wedding gown selection for your
                body shape.
              </p>
              <h4 style={{ color: "#000" }}>
                Finding a splendid Wedding Gown for Your Body Shape?
              </h4>
              <h5 style={{ color: "#000" }}> Pear Shaped Body</h5>
              <p>
                If you have a heavier bottom as compared to your upper body,
                then you have a pear-shaped figure. Consider wearing sarees in
                breathable fabrics that easy to carry like georgette and
                chiffon. This will help to balance out your lower and upper
                part. Also, how you drape the saree makes a lot of difference in
                how you look. When wearing georgette or chiffon sarees for
                wedding function, drape it in a seedha pallu style. Bold and
                bright colours are the key.
              </p>
              <h5 style={{ color: "#000" }}>Apple Shaped Body</h5>
              <p>
                Those who have an apple-shaped body are blessed to have
                voluptuous curves with heavy busts and stomach. If you fall in
                this category then silk fabric is your best friend. Just make
                sure to wrap it a little higher with longer blouses to cover the
                problem areas. Sarees with heavy embroidery, bold prints, and
                contrasting blouses can help to add a dramatic appeal to your
                overall look.
              </p>
              <h5 style={{ color: "#000" }}>Hourglass</h5>
              <p>
                A balanced shape with a thinner waist is the ideal shape of the
                hourglass structure. Though it is known as ideal perfect shape
                of a woman you still need to show off your terrific asset, we
                would recommend you to opt for a fishtail fit gown and top it
                with a pair of high heels to balance your figure to
                exquisiteness.
              </p>
              <h5 style={{ color: "#000" }}>
                Sarees for Wedding Function for Tall and Slim Body
              </h5>
              <p>
                If you have a tall and slim figure, consider yourself lucky. You
                have a body type which can carry almost all types of sarees
                effortlessly. From cotton and silk to tussar, chiffon, and
                georgette anything will look good on you. Heavy borders, big and
                bold prints should be your first priority.
              </p>
              <h5 style={{ color: "#000" }}>Rectangle</h5>
              <p>
                Body type with broad shoulders, small bust, and skinny legs
                comes in the category of Rectangle. With an athletic figure,
                it's all about creating a shape. You haven't got a defined waist
                so you'll need a dress that can give you curves in all the right
                places. Embracing the ballerina style is a definite yes since
                the delicate shape and hugging designs will emphasize your slim
                figure. Adding a belt or sash will also give you the illusion of
                curvy and tiny waist that prompts the hourglass structure..
              </p>
              <div class="mw-100"></div>
              <h5 style={{ color: "#000" }}>Inverted Triangle shape</h5>
              <p>
                Broad shoulders with flat bust and tiny waist are the attributes
                of triangle body shape. You will be needed to enhance your bust
                and give a fuller illusion in below waist. A-line dress and
                mermaid style can be of an ideal choice
              </p>
              <blockquote class="quote-block">
                In short, there is nobody type which is unfit for sporting a
                saree. Just make sure to keep these tips in mind the next time
                you go out shopping for sarees for wedding function.
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Blog;
