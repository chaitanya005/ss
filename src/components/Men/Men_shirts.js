import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styles from "../style.module.css";
import db from "../../firebase";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveMenShirts,
  getMenShirts,
} from "../../features/men-shirts/menShirt";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: "none",
  },
  media: {
    height: 0,
    paddingTop: "150%", // 16:9
  },
}));

const Men_shirts = () => {
  const classes = useStyles();
  let allShirt = [];
  let documents = [];

  const dispatch = useDispatch();

  const menShirts = useSelector(getMenShirts);

  useEffect(() => {
    db.collection("men-wear").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        allShirt.push(doc.data());
        let docu = doc.data();
        let id = doc.id;

        documents = [...documents, { shirtId: id, ...docu }];

        // console.log(documents)
        dispatch(
          saveMenShirts({
            documents,
          })
        );
      });
    });
  }, []);

  console.log(menShirts);

  return (
    <Container>
      <H1>Men Shirts</H1>

      {/*<Content>
                <Wrap>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8469259/2019/12/3/08d63a46-a0f1-4d6b-9eea-9e476fce7c4e1575377853407-HIGHLANDER-by-Rohit-Sharma-Men-White--Blue-Slim-Fit-Checked--1.jpg"
                            title="Paella "
                        />
                        <CardContent>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h5" component="h2">
                                    Item One
                                </Typography>
                                <div className={styles.starsRow} style = {{flexDirection: 'row-reverse'}}>
                                    <div className={styles.priceTag}>
                                        <div className={styles.priceTagPrice}>
                                        {'$100.00'}
                                        </div>
                                        <div className={styles.triangle}>
                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Typography gutterBottom variant="h6" component="h2">
                            Silk Saree
                            </Typography>
                        </CardContent>
                    </Card>
                </Wrap>
                <Wrap>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086786-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-9891566454-1.jpg"
                            title="Paella "
                        />
                        <CardContent>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h5" component="h2">
                                    Item One
                                </Typography>
                                <div className={styles.starsRow} style = {{flexDirection: 'row-reverse'}}>
                                    <div className={styles.priceTag}>
                                        <div className={styles.priceTagPrice}>
                                        {'$100.00'}
                                        </div>
                                        <div className={styles.triangle}>
                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Typography gutterBottom variant="h6" component="h2">
                            Silk Saree
                            </Typography>
                        </CardContent>
                    </Card>
                </Wrap>
                <Wrap>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11895964/2020/8/10/e5f829dd-8054-44bb-b22f-e8e538e1250c1597059111343-Roadster-Men-Shirts-8671597059109784-1.jpg"
                            title="Paella "
                        />
                        <CardContent>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h5" component="h2">
                                    Item One
                                </Typography>
                                <div className={styles.starsRow} style = {{flexDirection: 'row-reverse'}}>
                                    <div className={styles.priceTag}>
                                        <div className={styles.priceTagPrice}>
                                        {'Rs.100.00'}
                                        </div>
                                        <div className={styles.triangle}>
                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Typography gutterBottom variant="h6" component="h2">
                            Silk Saree
                            </Typography>
                        </CardContent>
                    </Card>
                </Wrap>
                <Wrap>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11361604/2020/3/3/309a77f1-5362-49ba-b1b2-155a461456701583220451104-WROGN-Men-Shirts-2101583220448547-1.jpg"
                            title="Paella "
                        />
                        <CardContent>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h5" component="h2">
                                    Item One
                                </Typography>
                                <div className={styles.starsRow} style = {{flexDirection: 'row-reverse'}}>
                                    <div className={styles.priceTag}>
                                        <div className={styles.priceTagPrice}>
                                        {'$100.00'}
                                        </div>
                                        <div className={styles.triangle}>
                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Typography gutterBottom variant="h6" component="h2">
                            Silk Saree
                            </Typography>
                        </CardContent>
                    </Card>
                </Wrap>
                <Wrap>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11579328/2020/3/4/67eb65a2-d0ee-4215-8fbf-c97f8c5a7a081583316907459-Moda-Rapido-Men-Shirts-6681583316905761-1.jpg"
                            title="Paella "
                        />
                        <CardContent>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h5" component="h2">
                                    Item One
                                </Typography>
                                <div className={styles.starsRow} style = {{flexDirection: 'row-reverse'}}>
                                    <div className={styles.priceTag}>
                                        <div className={styles.priceTagPrice}>
                                        {'$100.00'}
                                        </div>
                                        <div className={styles.triangle}>
                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Typography gutterBottom variant="h6" component="h2">
                            Silk Saree
                            </Typography>
                        </CardContent>
                    </Card>
                </Wrap>
            </Content> */}

      <Content>
        {menShirts &&
          menShirts.menshirts.map((shirt) => (
            <a href={`/product-detail?id=${shirt.shirtId}&name=${shirt.name}`}>
              <Wrap key={shirt.id}>
                <Card className={classes.root}>
                  <CardMedia className={classes.media} image={shirt.image} />
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h5" component="h2">
                        {shirt.name}
                      </Typography>
                      {/* <div className={styles.vc}>60% OFF</div> */}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ fontSize: "14px", color: "#858D95" }}>
                        {shirt.info}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div
                        className={styles.starsRow}
                        style={{ flexDirection: "row-reverse" }}
                      >
                        <div className={styles.priceTag}>
                          <div className={styles.priceTagPrice}>
                            Rs.{shirt.cost}
                          </div>
                          <div className={styles.triangle}></div>
                        </div>
                      </div>

                      <div
                        className={styles.starsRow}
                        style={{ flexDirection: "row-reverse" }}
                      >
                        <div className={styles.actualPriceTag}>
                          <div className={styles.actualPriceTagPrice}>
                            Rs.{shirt.actual_cost}
                          </div>
                          <div className={styles.actualTriangle}></div>
                        </div>
                      </div>

                      <Discount>
                        <Dis
                          actual_cost={shirt.actual_cost}
                          cost={shirt.cost}
                        />
                      </Discount>
                    </div>
                  </CardContent>
                </Card>
              </Wrap>
            </a>
          ))}
      </Content>
    </Container>
  );
};

function Dis(actual_cost) {
  let discount = Math.ceil((actual_cost.actual_cost - actual_cost.cost) / 10);

  return <div>({discount}% Off)</div>;
}

const Container = styled.main`
  // position: absolute;
  top: 80px;
  min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
`;

const H1 = styled.h1`
  color: #3e4152;
  text-align: center;
  text-transform: uppercase;
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
  // box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgb(249, 249, 249, 0.1);
  max-height: 510px;

  &:hover {
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Discount = styled.div`
  font-size: 14px;
  color: green;
  margin-top: 5px;
  font-weight: 700;
`;

export default Men_shirts;

/* categoryType
cost
description
image
info
name */
