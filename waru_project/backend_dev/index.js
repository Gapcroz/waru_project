const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const signLogin = require("./modules/signLogin");
const Respaneg = require("./models/respaneg");

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

// CRUD
app.post("/api/signin", function (req, res) {
  signLogin.createUser(req, res);
});

app.post("/api/login/", function (req, res) {
  signLogin.logIn(req, res);
});

app.post("/api/resp-a-neg", async function (req, res) {
  try {
    const { pregunta1, pregunta2 } = req.body;
    const respaneg = new Respaneg({ pregunta1, pregunta2 });
    const createdRespuesta = await respaneg.save();
    return res.status(200).json({
      msg: "Datos almacenados en MongoDB",
      respuesta: createdRespuesta._id,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al almacenar datos",
      success: false,
    });
  }
});

// CRUD
db.connect();
const port = 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
