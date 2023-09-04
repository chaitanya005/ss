import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectRecommend } from "../features/movie/movieSlice";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "./style.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "150%", // 16:9
  },
}));

const Arrived = () => {
  // const movies = useSelector(selectRecommend);
  // console.log(movies)
  const classes = useStyles();

  return (
    <Container>
      <H1>Mens Wear</H1>
      {/* <Content> */}
      {/* movies && movies.map((movie, key) => (
                <Wrap key = {key}>
                    {movie.id}
                    <Link to = {"/detail/" + movie.id}>
                        <img src = {movie.cardImg} alt = {movie.title} />
                    </Link>
                </Wrap>
            )) */}
      <>
        {/* <Wrap>
                    <Link>
                        <img src = "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C0A883EAB54DDDC924018D08CF4555EE72B3E9A8C214BDADF29CB82B5E2275D7/scale?width=400&aspectRatio=1.78&format=jpeg" alt = "" />
                    </Link>
                </Wrap> 
                <Wrap>
                    <Link>
                        <img src = "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C0A883EAB54DDDC924018D08CF4555EE72B3E9A8C214BDADF29CB82B5E2275D7/scale?width=400&aspectRatio=1.78&format=jpeg" alt = "" />
                    </Link>
                </Wrap> 
                <Wrap>
                    <Link>
                        <img src = "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C0A883EAB54DDDC924018D08CF4555EE72B3E9A8C214BDADF29CB82B5E2275D7/scale?width=400&aspectRatio=1.78&format=jpeg" alt = "" />
                    </Link>
                </Wrap> 
                <Wrap>
                    <Link>
                        <img src = "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C0A883EAB54DDDC924018D08CF4555EE72B3E9A8C214BDADF29CB82B5E2275D7/scale?width=400&aspectRatio=1.78&format=jpeg" alt = "" />
                    </Link>
                </Wrap> */}
      </>
      {/* <Wrap>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/C0A883EAB54DDDC924018D08CF4555EE72B3E9A8C214BDADF29CB82B5E2275D7/scale?width=400&aspectRatio=1.78&format=jpeg"
              title="Paella "
            />
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" component="h2">
                  Item One
                </Typography>
                <div
                  className={styles.starsRow}
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className={styles.priceTag}>
                    <div className={styles.priceTagPrice}>{"$100.00"}</div>
                    <div className={styles.triangle}></div>
                  </div>
                </div>
              </div>
              <Typography gutterBottom variant="h6" component="h2">
                Silk Saree
              </Typography>
            </CardContent>
          </Card>
      </Wrap> */}
      <Content>
        <Wrap className={styles.myBtnClass}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11361604/2020/3/3/309a77f1-5362-49ba-b1b2-155a461456701583220451104-WROGN-Men-Shirts-2101583220448547-1.jpg"
              title="Paella "
            />
            {/* <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" component="h2">
                  Item One
                </Typography>
                <div
                  className={styles.starsRow}
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className={styles.priceTag}>
                    <div className={styles.priceTagPrice}>{"$100.00"}</div>
                    <div className={styles.triangle}></div>
                  </div>
                </div>
              </div>
              <Typography gutterBottom variant="h6" component="h2">
                Silk Saree
              </Typography>
            </CardContent> */}
          </Card>
          <br />
          <div className="pb-4 entity-content">
            <h4
              className="entity-title"
              style={{ color: "#3e4152", textAlign: "center", margin: 0 }}
            >
              WRONG
            </h4>
            <div
              className="entity-price"
              style={{ color: "#3e4152", textAlign: "center" }}
            >
              <span className="currency">Rs.</span>800{" "}
              <span className="price-unit"></span>
            </div>
          </div>
          <h6 className={styles.btnOver}>Coming Soon</h6>
        </Wrap>
        <Wrap className={styles.myBtnClass}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11579328/2020/3/4/953b405d-547a-4387-a07f-068c6494783d1583316907336-Moda-Rapido-Men-Shirts-6681583316905761-4.jpg"
              title="Paella "
            />
            {/* <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" component="h2">
                  Item One
                </Typography>
                <div
                  className={styles.starsRow}
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className={styles.priceTag}>
                    <div className={styles.priceTagPrice}>{"$100.00"}</div>
                    <div className={styles.triangle}></div>
                  </div>
                </div>
              </div>
              <Typography gutterBottom variant="h6" component="h2">
                Silk Saree
              </Typography>
            </CardContent> */}
          </Card>
          <br />
          <div className="pb-4 entity-content">
            <h4
              className="entity-title"
              style={{ color: "#3e4152", textAlign: "center", margin: 0 }}
            >
              Moda Rapido
            </h4>
            <div
              className="entity-price"
              style={{ color: "#3e4152", textAlign: "center" }}
            >
              <span className="currency">Rs.</span>1200{" "}
              <span className="price-unit"></span>
            </div>
          </div>
          <h6 className={styles.btnOver}>Coming Soon</h6>
        </Wrap>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;
const H1 = styled.h1`
  color: #3e4152;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  // padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgb(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    object-fit: cover;
    height: 100%;
    position: absolute;
    opacity: 1;
    transtion: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Arrived;
