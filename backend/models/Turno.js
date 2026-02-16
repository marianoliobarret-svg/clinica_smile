// models/Turno.js
const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  fecha: String,   // YYYY-MM-DD
  hora: String     // HH:mm
});

module.exports = mongoose.model("Turno", turnoSchema);
