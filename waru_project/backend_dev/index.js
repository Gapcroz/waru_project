const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const User = require("./models/users");
const bcrypt = require("bcrypt"); // ayuda a encriptar el texto
const jwt = require("jsonwebtoken"); // genera token para las encriptadas

const jwkey = "qjoplenchfil";

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
// FUNCIONES
const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const emailexists = await User.exists({ email: email });
    if (emailexists) {
      return res.status(400).json({
        msg: "el correo ya existe",
      });
    } else {
      const passwordCifrado = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        password: passwordCifrado,
        email: email,
      });
      const createdUser = await newUser.save();
      return res.status(201).json({
        msg: "Usuario creado",
        user: createdUser._id,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// CRUD
app.post("/api/signin", function (req, res) {
  createUser(req, res);
});

app.post("/api/login/", async function (req, res) {
  let emailRecibido = req.body.email;
  let passwordRecibido = req.body.password;
  try {
    const usuarioEncontrado = await User.findOne({ email: emailRecibido });
    if (!usuarioEncontrado) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    } else {
      const matchUser = await bcrypt.compare(
        passwordRecibido,
        usuarioEncontrado.password
      );
      if (!matchUser) {
        return res.status(401).json({
          msg: "usuario no coincide",
        });
      } else {
        const payload = {
          id: usuarioEncontrado._id,
          name: usuarioEncontrado.username,
        };
        const token = jwt.sign(payload, jwkey, { expiresIn: 60 });
        return res.status(200).json({
          msg: "log in exitoso",
          token: token,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// CRUD
db.connect();
const port = 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
