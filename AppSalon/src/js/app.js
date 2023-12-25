let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  id: "",
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion();
  tabs();
  botonesPaginador();
  paginaSiguiente();
  paginaAnterior();

  consultarAPI();

  idCliente();
  nombreCliente();
  seleccionarFecha();
  seleccionarHora();

  mostrarResumen();
}

function tabs() {
  const botones = document.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      paso = parseInt(e.target.dataset.paso);
      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function mostrarSeccion() {
  const seccionAnterior = document.querySelector(`.mostrar`);
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  const seccion = document.querySelector(`#paso-${paso}`);
  seccion.classList.add("mostrar");

  const tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function botonesPaginador() {
  const paginaSiguiente = document.querySelector("#siguiente");
  const paginaAnterior = document.querySelector("#anterior");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaSiguiente.classList.add("ocultar");
    paginaAnterior.classList.remove("ocultar");
    mostrarResumen();
  } else {
    paginaSiguiente.classList.remove("ocultar");
    paginaAnterior.classList.remove("ocultar");
  }
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", () => {
    if (paso <= pasoInicial) return;

    paso--;
    mostrarSeccion();
    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", () => {
    if (paso >= pasoFinal) return;

    paso++;
    mostrarSeccion();
    botonesPaginador();
  });
}

async function consultarAPI() {
  try {
    const url = `${location.origin}/api/servicios`;
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;

    const nombreServicio = document.createElement("P");
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `${precio}$`;

    const servicioDiv = document.createElement("DIV");
    servicioDiv.classList.add("servicio");
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = function () {
      seleccionarServicio(servicio);
    };

    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    document.querySelector("#servicios").appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita;

  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  if (servicios.some((agregado) => agregado.id === id)) {
    cita.servicios = servicios.filter((servicio) => servicio.id !== id);
    divServicio.classList.remove("seleccionado");
  } else {
    cita.servicios = [...servicios, servicio];
    divServicio.classList.add("seleccionado");
  }
}

function idCliente() {
  cita.id = document.querySelector("#id").value;
}

function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  inputFecha.addEventListener("input", (e) => {
    const dia = new Date(e.target.value).getUTCDay();

    if ([6, 0].includes(dia)) {
      e.target.value = "";
      mostrarAlerta("No trabajamos los días sábados y domingos", "error");
    } else {
      cita.fecha = e.target.value;
    }
  });
}

function seleccionarHora() {
  const inputHora = document.querySelector("#hora");
  inputHora.addEventListener("input", (e) => {
    const horaCita = e.target.value;

    const h = horaCita.split(":");
    const hora = Number(h[0]);
    const minutos = Number(h[1]);

    if (hora < 10 || hora > 18 || (hora === 18 && minutos > 0)) {
      e.target.value = "";
      mostrarAlerta(
        "Hora no válida. Trabajamos de 10:00 am a 6:00 pm",
        "error"
      );
    } else {
      cita.hora = e.target.value;
    }
  });
}

function mostrarAlerta(
  mensaje,
  tipo,
  elemento = ".formulario",
  desaparece = true
) {
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) {
    alertaPrevia.remove();
  }

  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);

  const referencia = document.querySelector(`${elemento}`);
  referencia.appendChild(alerta);

  if (desaparece) {
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarResumen() {
  const resumen = document.querySelector(".contenido-resumen");

  while (resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }

  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "Necesitas incluir datos de Servicios, Fecha y Hora",
      "error",
      ".contenido-resumen",
      false
    );

    return;
  }

  const { nombre, fecha, hora, servicios } = cita;

  const headingServicios = document.createElement("H3");
  headingServicios.textContent = "Resumen de Servicios:";
  resumen.appendChild(headingServicios);

  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;
    const contenedorServicio = document.createElement("DIV");
    contenedorServicio.classList.add("contenedor-servicio");
    contenedorServicio.dataset.idServicio = id;

    const textoServicio = document.createElement("P");
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.innerHTML = `<span>Precio:</span> ${precio}$`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  const headingCita = document.createElement("H3");
  headingCita.textContent = "Resumen de la Cita:";
  resumen.appendChild(headingCita);

  const nombreCliente = document.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const anio = fechaObj.getFullYear();

  const fechaUTC = new Date(Date.UTC(anio, mes, dia));

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaUTC.toLocaleDateString("es-MX", opciones);

  const fechaCita = document.createElement("P");
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

  const horaCita = document.createElement("P");
  horaCita.innerHTML = `<span>Hora:</span> ${hora} hrs.`;

  const subtotalCita = document.createElement("P");
  const subtotal = calcularSubtotal().toFixed(2);
  subtotalCita.innerHTML = `<span>Subtotal:</span> ${subtotal}$`;

  const ivaCita = document.createElement("P");
  const iva = (subtotal * 0.16).toFixed(2);
  ivaCita.innerHTML = `<span>IVA (16%):</span> ${iva}$`;

  const totalCita = document.createElement("P");
  const total = (parseFloat(subtotal) + parseFloat(iva));
  totalCita.innerHTML = `<span>Total:</span> ${total.toFixed(2)}$`;

  const botonReservar = document.createElement("BUTTON");
  botonReservar.classList.add("boton");
  botonReservar.textContent = "Reservar Cita";
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);
  resumen.appendChild(subtotalCita);
  resumen.appendChild(ivaCita);
  resumen.appendChild(totalCita);

  resumen.appendChild(botonReservar);
}

function calcularSubtotal() {
  const { servicios } = cita;
  return servicios.reduce((acc, servicio) => acc + parseFloat(servicio.precio), 0);
}


async function reservarCita() {

  const { fecha, hora, servicios, id } = cita;
  const idServicios = servicios.map(servicio => servicio.id);

  const datos = new FormData();

  datos.append("usuarioId", id);
  datos.append("hora", hora);
  datos.append("fecha", fecha);
  datos.append("servicios", idServicios);

  try{

    const url = `${location.origin}/api/citas`;
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    });
  
    const resultado = await respuesta.json();
  
    if (resultado.resultado) {
      Swal.fire({
        icon: "success",
        title: "Cita Creada",
        text: "La cita se ha creado correctamente",
        button: "OK",
      }).then(() => {
          window.location.reload();
      })
    }

  }catch(error){
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un error al crear la cita",
      button: "OK",
    })
  }

 

}
