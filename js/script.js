const reveals = document.querySelectorAll('.reveal');

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function revealOnScroll() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visible = 100;

    if (elementTop < windowHeight - visible) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {

  const faders = document.querySelectorAll('.fade-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));

});

const fechaInput = document.querySelector('input[type="date"]');
const horariosContainer = document.getElementById("horarios");
const horaHidden = document.querySelector('input[name="horaSeleccionada"]');
const hoy = new Date().toISOString().split("T")[0];
fechaInput.setAttribute("min", hoy);

fechaInput.addEventListener("change", async () => {

  const fecha = fechaInput.value;
  horariosContainer.innerHTML = "";
  horaHidden.value = "";

  const dia = new Date(fecha).getDay();

  // Bloquear sábados y domingos
  if (dia === 0 || dia === 6) {
    alert("Solo se permiten turnos de lunes a viernes.");
    return;
  }

  // Obtener horarios ocupados desde backend
  let ocupados = [];

  try {
    const response = await fetch(`http://localhost:3000/api/turnos/${fecha}`);
    ocupados = await response.json();
  } catch (error) {
    console.error("Error al obtener horarios");
  }

  // Generar horarios válidos
  const horarios = [];

  for (let h = 9; h < 18; h++) {
    horarios.push(`${h}:00`);
    horarios.push(`${h}:30`);
  }

  horarios.forEach(hora => {

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = hora;

    if (ocupados.includes(hora)) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {

      document.querySelectorAll(".horarios-grid button")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
      horaHidden.value = hora;
    });

    horariosContainer.appendChild(btn);
  });

});


window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Frontend - conectar al formulario
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = {
    nombre: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    telefono: form.querySelector('input[type="tel"]').value,
    fecha: form.querySelector('input[type="date"]').value,
    hora: form.querySelector('input[type="time"]').value
  };

  try {
    const response = await fetch("http://localhost:3000/api/turnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error);
    } else {
      alert("Turno reservado correctamente");
      form.reset();
    }

  } catch (error) {
    alert("Error de conexión con el servidor");
  }
});
