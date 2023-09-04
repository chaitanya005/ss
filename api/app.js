/* const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const fs = require("fs");

app.use(
  express.static(
    path.resolve(__dirname, "..", "build")
    // { maxAge: '30d' },
  )
);

const indexPath = path.resolve(__dirname, "..", "build", "index.html");

app.get("/returnandrefund", (req, res, next) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }

    htmlData = htmlData
      .replace(
        "<title>Spont Store | Return Refund</title>",
        `<title>Returnn Refundddd</title>`
      )
      .replace("Spont Store", "Returnn Refunddd")
      .replace(
        "Online Store for brand new fashion clothing, fresh veggies, groceries, and also order Your favourite food from your favourite restaurant's",
        "SPont store retun refund __META_OG_DESCRIPTION__"
      )
      .replace(
        "__META_DESCRIPTION__",
        "SPont store retun refund __META_DESCRIPTION__"
      );

    return res.send(htmlData);
  });
});

app.get("/helo", (req, res) => {
  res.send({ message: "hello world" });
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
 */

/* const express = require("express");
const app = express();
const path = require("path");

app.use(express.json({ extended: false }));

app.get("/helo", (req, res) => {
  res.send({ message: "hey! there" });
});

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.get("*", function (req, res) {
  res.sendFile(
    path.resolve(__dirname, "..", "build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

module.exports = app; */
