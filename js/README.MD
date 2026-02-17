🦷 Clínica Dental – Sistema de Turnos (Portfolio)

Sistema fullstack de reserva de turnos desarrollado con:

Node.js + Express

MongoDB Atlas (Mongoose)

Frontend HTML + JS Vanilla

Deploy en Render

(Próximo paso: Netlify)

🚀 Estado Actual
✅ Backend (Producción)

Deployado en Render

Conectado a MongoDB Atlas

Variables de entorno configuradas

CORS habilitado

Puerto dinámico funcionando

Logs actuales:

Servidor corriendo en puerto 10000
MongoDB conectado

🔌 Endpoints activos
Crear turno
POST /api/turnos


Body:

{
  "nombre": "Juan Perez",
  "email": "juan@email.com",
  "telefono": "12345678",
  "fecha": "2026-02-20",
  "hora": "10:30"
}


Valida:

Día hábil

Horario válido

No duplicados

Obtener horarios ocupados
GET /api/turnos/:fecha


Ejemplo:

/api/turnos/2026-02-20


Devuelve:

[]


o

["09:30", "11:00"]

🌐 URL Backend Producción
https://TU-APP.onrender.com

🧠 Arquitectura final
backend/
│
├── server.js
├── models/
│   └── Turno.js
├── routes/
│   └── turnos.js
├── utils/
├── package.json


Separación correcta:

server.js → servidor principal

routes → lógica endpoints

models → esquema Mongoose

⚠️ Pendiente actual

Frontend conectado a producción pero:

Error local ERR_CONNECTION_REFUSED

Probablemente por:

URL mal apuntada

Uso de file:// en vez de Live Server

O fetch mal configurado

🎯 Plan para retomar a la tarde
FASE 1 – Debug frontend contra backend producción

Verificar fetch definitivo

Probar con Live Server

Confirmar:

Carga horarios

Guarda turno

Se persiste en Atlas

FASE 2 – Deploy frontend

Subir a Netlify

Ajustar CORS si es necesario

Test completo online

FASE 3 – Mejora del sistema

Confirmación automática por email

Panel admin minimalista

Formulario de contacto

Loader UX

Manejo de errores visual