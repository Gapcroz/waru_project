const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.unsubscribe(express.static(`${__dirname}/public`));

app.use(cors());
app.use(bodyParser.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "origin",
    "X-Api-Key",
    "x-requested-with",
    "Content-type",
    "Accept",
    "Authorization"
  );
  next();
});

const port = 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
