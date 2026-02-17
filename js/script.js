const API_URL = "https://clinica-smile.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");
  const reveals = document.querySelectorAll(".reveal");
  const faders = document.querySelectorAll(".fade-scroll");

  const fechaInput = document.querySelector('input[type="date"]');
  const horariosContainer = document.getElementById("horarios");
  const horaHidden = document.querySelector('input[name="hora"]');
  const form = document.querySelector("form");

  if (!form || !fechaInput || !horariosContainer || !horaHidden) return;

  /* ================= NAVBAR SCROLL ================= */

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  /* ================= REVEAL SCROLL ================= */

  function revealOnScroll() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const visible = 100;

      if (elementTop < windowHeight - visible) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  /* ================= INTERSECTION OBSERVER ================= */

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

  /* ================= FECHA CONFIG ================= */

  const hoy = new Date().toISOString().split("T")[0];
  fechaInput.setAttribute("min", hoy);

  fechaInput.addEventListener("change", async () => {
   

    const fecha = fechaInput.value;
    horariosContainer.innerHTML = "";
    horaHidden.value = "";

    console.log("Fecha seleccionada:", fecha);

    const dia = new Date(fecha).getDay();

    // Bloquear sábado (6) y domingo (0)
    if (dia === 5 || dia === 6) {
      alert("Solo se permiten turnos de lunes a viernes.");
      fechaInput.value = "";
      return;
    }

    let ocupados = [];

    try {
      const response = await fetch(`${API_URL}/api/turnos/${fecha}`);

      if (!response.ok) {
        throw new Error("Error al obtener horarios");
      }

      ocupados = await response.json();

      console.log("Horarios ocupados:", ocupados);


    } catch (error) {
      console.error(error);
      alert("Error al obtener horarios del servidor.");
      return;
    }

    /* ================= GENERAR HORARIOS ================= */

    const horarios = [];

    for (let h = 9; h < 18; h++) {
      horarios.push(`${h}:00`);
      horarios.push(`${h}:30`);
    }

    horarios.forEach(hora => {

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = hora;
      btn.classList.add("hora-btn");

      if (ocupados.includes(hora)) {
        btn.disabled = true;
      }

      btn.addEventListener("click", () => {

        document.querySelectorAll(".hora-btn")
          .forEach(b => b.classList.remove("selected"));

        btn.classList.add("selected");
        horaHidden.value = hora;
      });

      horariosContainer.appendChild(btn);
    });

  });

  /* ================= SUBMIT FORM ================= */

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!horaHidden.value) {
      alert("Por favor seleccioná un horario.");
      return;
    }

    const datos = {
      nombre: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      telefono: form.querySelector('input[type="tel"]').value,
      fecha: fechaInput.value,
      hora: horaHidden.value
    };

    try {

      const response = await fetch(`${API_URL}/api/turnos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Error al reservar turno");
        return;
      }

      alert("Turno reservado correctamente");

      form.reset();
      horariosContainer.innerHTML = "";
      horaHidden.value = "";

    } catch (error) {
      alert("Error de conexión con el servidor");
    }

  });

});

const contactoForm = document.getElementById("contactoForm");
const contactoEstado = document.getElementById("contactoEstado");

contactoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = {
    nombre: contactoForm.nombre.value,
    email: contactoForm.email.value,
    mensaje: contactoForm.mensaje.value
  };

  try {

    const response = await fetch(`${API_URL}/api/contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const result = await response.json();

    if (!response.ok) {
      contactoEstado.textContent = result.error;
      contactoEstado.style.color = "red";
      return;
    }

    contactoEstado.textContent = "Mensaje enviado correctamente ✔";
    contactoEstado.style.color = "green";
    contactoForm.reset();

  } catch (error) {
    contactoEstado.textContent = "Error de conexión con el servidor";
    contactoEstado.style.color = "red";
  }

});
