// routes/turnos.js
const express = require("express");
const router = express.Router();
const Turno = require("../models/Turno");
const express = require("express");
const { esDiaHabil, esHorarioValido } = require("../utils/horarios");



router.post("/", async (req, res) => {
  const { nombre, email, telefono, fecha, hora } = req.body;

  try {
    // Validar día hábil
    if (!esDiaHabil(fecha)) {
      return res.status(400).json({ error: "Solo se permiten turnos de lunes a viernes." });
    }

    // Validar horario permitido
    if (!esHorarioValido(hora)) {
      return res.status(400).json({ error: "Horario fuera del rango permitido." });
    }

    // Verificar duplicado
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
x
router.get("/:fecha", async (req, res) => {
  try {
    const turnos = await Turno.find({ fecha: req.params.fecha });
    const horasOcupadas = turnos.map(t => t.hora);

    res.json(horasOcupadas);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener turnos." });
  }
});


module.exports = router;
