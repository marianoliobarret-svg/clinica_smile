// routes/turnos.js
const express = require("express");
const router = express.Router();
const Turno = require("../models/Turno");

router.post("/", async (req, res) => {
  const { nombre, email, telefono, fecha, hora } = req.body;

  try {
    // Verificar si ya existe turno en esa fecha y hora
    const existente = await Turno.findOne({ fecha, hora });

    if (existente) {
      return res.status(400).json({ error: "Ese horario ya está reservado." });
    }

    const nuevoTurno = new Turno({ nombre, email, telefono, fecha, hora });
    await nuevoTurno.save();

    res.status(201).json({ message: "Turno reservado con éxito." });

  } catch (error) {
    res.status(500).json({ error: "Error al reservar turno." });
  }
});

module.exports = router;
