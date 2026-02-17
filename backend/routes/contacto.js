const express = require("express");
const router = express.Router();
const Contacto = require("../models/Contacto");

router.post("/", async (req, res) => {

  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {

    const nuevoMensaje = new Contacto({
      nombre,
      email,
      mensaje
    });

    await nuevoMensaje.save();

    res.status(201).json({ message: "Mensaje enviado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error al guardar mensaje" });
  }

});

module.exports = router;
