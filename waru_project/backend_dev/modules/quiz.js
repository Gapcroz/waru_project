const Respaneg = require("../models/respaneg");

const quizRespaneg = async (req, res) => {
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
};

module.exports = {
  quizRespaneg: quizRespaneg,
};
