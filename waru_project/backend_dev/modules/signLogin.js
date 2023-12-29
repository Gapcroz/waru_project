const User = require("../models/users");
const bcrypt = require("bcrypt"); // ayuda a encriptar el texto
const jwt = require("jsonwebtoken"); // genera token para las encriptadas
const jwkey = "qjoplenchfil";

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

const logIn = async (req, res) => {
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
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser: createUser,
  logIn: logIn,
};
