🦷 Clínica Dental – Mini Sistema de Turnos

Sistema de reserva de turnos con:

Node.js + Express

MongoDB (Mongoose)

Validación de días y horarios

Bloqueo de turnos duplicados

Generación dinámica de horarios en frontend

📁 Estructura del Proyecto
Backend
/backend
 ├── server.js
 ├── models/
 │     └── Turno.js
 ├── routes/
 │     └── turnos.js
 ├── utils/
 │     └── horarios.js
 ├── .env
 └── package.json

Frontend

Formulario HTML

Generación dinámica de horarios

Conexión vía fetch a API

Validación de fechas pasadas

Bloqueo de fines de semana

🚀 Cómo correr el proyecto localmente
1️⃣ Instalar dependencias

Dentro de /backend:

npm install

2️⃣ Configurar variables de entorno

Crear archivo .env:

MONGO_URI=tu_string_de_mongodb
PORT=3000

3️⃣ Iniciar servidor
node server.js


Servidor corre en:

http://localhost:3000

🔌 Endpoints disponibles
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


Validaciones:

Solo lunes a viernes

Solo 9:00 a 17:30

Turnos cada 30 min

No duplicados

Obtener horarios ocupados
GET /api/turnos/:fecha


Ejemplo:

GET /api/turnos/2026-02-20


Devuelve:

["09:30", "11:00", "16:30"]

🧠 Lógica implementada
Backend valida:

✔ Día hábil
✔ Horario válido
✔ Turno no duplicado

Frontend controla:

✔ Fecha mínima = hoy
✔ Bloqueo fines de semana
✔ Generación automática 9:00–17:30
✔ Desactivación de horarios ocupados
✔ Guardado en input hidden

🌐 Deploy previsto

Frontend → Netlify
Backend → Render
DB → MongoDB Atlas

Pendiente:

Cambiar URL fetch de localhost a URL producción

Configurar CORS correctamente

📌 Pendientes para continuar

 Confirmación por email automática

 Panel admin para ver turnos

 Envío WhatsApp automático

 Manejo de errores visual más elegante (no usar alert)

 Loader mientras se cargan horarios

 Manejo de zona horaria explícita

💡 Estado actual

Sistema funcional en entorno local.
Listo para integración con producción.
Arquitectura limpia y escalable.

Mariano… mañana cuando volvamos podemos arrancar directo por:

1️⃣ Deploy completo
2️⃣ Confirmación automática por email
3️⃣ Panel admin minimalista