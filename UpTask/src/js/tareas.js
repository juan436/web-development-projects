(function () {
  obtenerTareas();
  let tareas = [];
  let filtradas = [];

  const nuevaTareaBtn = document.querySelector("#agregar-tarea");
  nuevaTareaBtn.addEventListener("click", function () {
    mostrarFormulario();
  });

  const filtros = document.querySelectorAll("#filtros input[type='radio']");

  filtros.forEach(radio => {
    radio.addEventListener('input', filtrarTareas);
  });

  function filtrarTareas(e) {
    const filtro = e.target.value;
    if(filtro !== ''){
      filtradas = tareas.filter(tarea => tarea.estado === filtro);
    }else{
      filtradas = [];
    }

    mostrarTareas();
  }

  async function obtenerTareas() {
    try {
      const id = obtenerProyecto();
      const url = `${location.origin}/api/tareas?url=${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      tareas = resultado.tareas;

      mostrarTareas();
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarTareas() {
    limpiarTareas();

    totalPendientes();
    totalCompletas();

    const arrayTareas = filtradas.length ? filtradas : tareas;

    const contenedorTareas = document.querySelector("#listado-tareas");

    if (arrayTareas.length === 0) {
      const textoNodoTareas = document.createElement("LI");
      textoNodoTareas.classList.add("no-tareas");
      textoNodoTareas.textContent = "No hay tareas";

      contenedorTareas.appendChild(textoNodoTareas);
      return;
    }

    const estados = {
      0: "Pendiente",
      1: "Completa",
    };

    arrayTareas.forEach((tarea) => {
      const contenedorTarea = document.createElement("LI");
      contenedorTarea.dataset.tareaId = tarea.id;
      contenedorTarea.classList.add("tarea");

      const nombreTarea = document.createElement("P");
      nombreTarea.textContent = tarea.nombre;
      nombreTarea.ondblclick = () => {
        mostrarFormulario((editar = true), { ...tarea });
      };

      const opcionesDiv = document.createElement("DIV");
      opcionesDiv.classList.add("opciones");

      const btnEstadoTarea = document.createElement("BUTTON");
      btnEstadoTarea.classList.add("estado-tarea");
      btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
      btnEstadoTarea.textContent = estados[tarea.estado];
      btnEstadoTarea.dataset.estadoTarea = tarea.estado;
      btnEstadoTarea.ondblclick = () => {
        cambiarEstadoTarea({ ...tarea });
      };

      const btnEliminarTarea = document.createElement("BUTTON");
      btnEliminarTarea.classList.add("eliminar-tarea");
      btnEliminarTarea.dataset.idTarea = tarea.id;
      btnEliminarTarea.textContent = "Eliminar";
      btnEliminarTarea.ondblclick = () => {
        confirmarEliminarTarea({ ...tarea });
      };

      opcionesDiv.appendChild(btnEstadoTarea);
      opcionesDiv.appendChild(btnEliminarTarea);

      contenedorTarea.appendChild(nombreTarea);
      contenedorTarea.appendChild(opcionesDiv);

      contenedorTareas.appendChild(contenedorTarea);
    });
  }

  function totalPendientes() {
    const totalPendientes = tareas.filter((tarea) => {
      return tarea.estado === "0";
    });

    const pendientesRadio = document.querySelector("#pendientes");

    if (totalPendientes.length === 0) {
      pendientesRadio.disabled = true;
    } else {
      pendientesRadio.disabled = false;
    }
  }

  function totalCompletas() {
    const totalCompletas = tareas.filter((tarea) => {
      return tarea.estado === "1";
    });

    const completasRadio = document.querySelector("#completadas");

    if (totalCompletas.length === 0) {
      completasRadio.disabled = true;
    } else {
      completasRadio.disabled = false;
    }
  }

  function cambiarEstadoTarea(tarea) {
    const nuevoEstado = tarea.estado === "1" ? "0" : "1";
    tarea.estado = nuevoEstado;
    actualizarTarea(tarea);
  }

  async function actualizarTarea(tarea) {
    const { estado, id, nombre, proyectoid } = tarea;
    const datos = new FormData();
    datos.append("id", id);
    datos.append("nombre", nombre);
    datos.append("estado", estado);
    datos.append("proyectoid", obtenerProyecto());

    try {
      const url = `${location.origin}/api/tarea/actualizar`;
      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });
      const resultado = await respuesta.json();

      if (resultado.respuesta.tipo === "exito") {
        mostrarAlerta(
          resultado.respuesta.mensaje,
          resultado.respuesta.tipo,
          document.querySelector(`.contenedor-nueva-tarea`)
        );

        const modal = document.querySelector(".modal");
        if(modal) {
          modal.remove();
        }

        tareas = tareas.map((tareaMemoria) => {
          if (tareaMemoria.id === id) {
            tareaMemoria.estado = estado;
            tareaMemoria.nombre = nombre;
          }
          return tareaMemoria;
        });

        mostrarTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function confirmarEliminarTarea(tarea) {
    Swal.fire({
      title: "¿Desea eliminar esta tarea?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        btnEliminarTarea(tarea);
      }
    });
  }

  async function btnEliminarTarea(tarea) {
    const { estado, id, nombre, proyectoid } = tarea;
    const datos = new FormData();
    datos.append("id", id);
    datos.append("nombre", nombre);
    datos.append("estado", estado);
    datos.append("proyectoid", obtenerProyecto());

    try {
      const url = `${location.origin}/api/tarea/eliminar`;
      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });
      const resultado = await respuesta.json();

      if (resultado.resultado) {
        mostrarAlerta(
          resultado.mensaje,
          resultado.tipo,
          document.querySelector(`.contenedor-nueva-tarea`)
        );

        tareas = tareas.filter((tareaMemoria) => {
          return tareaMemoria.id !== id;
        });

        mostrarTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarFormulario(editar = false, tarea = {}) {
    const modal = document.createElement("DIV");
    modal.classList.add("modal");

    modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>${
                  editar ? "Editar Tarea" : "Añade una nueva Tarea"
                }</legend>

                <div class="campo">
                    <label for="tarea">Nombre de la Tarea</label>
                    <input type="text" id="tarea" name="tarea" placeholder=${
                      tarea.nombre
                        ? "Editar la tarea"
                        : "Añadir una nueva tarea"
                    } value="${tarea.nombre ? tarea.nombre : ""}">
                </div>

                <div class="opciones">
                    <input type="submit" class="submit-nueva-tarea" value="${
                      editar ? "Guardar Cambios" : "Añadir Tarea"
                    }" />
                    <button type="button" class="cerrar-modal">Cancelar</button>
                </div>
            </form>
    `;

    setTimeout(() => {
      const formulario = document.querySelector(".formulario");
      formulario.classList.add("animar");
    }, 0);

    modal.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.classList.contains("cerrar-modal")) {
        const formulario = document.querySelector(".formulario");
        formulario.classList.add("cerrar");

        setTimeout(() => {
          modal.remove();
        }, 500);
      }

      if (e.target.classList.contains("submit-nueva-tarea")) {
        const nombreTarea = document.querySelector("#tarea").value.trim();

        if (nombreTarea === "") {
          mostrarAlerta(
            "El nombre de la tarea es obligatorio",
            "error",
            document.querySelector(".formulario legend")
          );
          return;
        }

        if (editar) {
          tarea.nombre = nombreTarea;
          actualizarTarea(tarea);
        }else{
          agregarTarea(nombreTarea);
        }
      }
    });

    document.querySelector(".dashboard").appendChild(modal);
  }

  function mostrarAlerta(mensaje, tipo, referencia) {
    const alertaPrevia = document.querySelector(".alerta");

    if (alertaPrevia) {
      alertaPrevia.remove();
    }

    const alerta = document.createElement("DIV");
    alerta.classList.add("alerta", tipo);
    alerta.textContent = mensaje;

    referencia.parentElement.insertBefore(
      alerta,
      referencia.nextElementSibling
    );

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

  async function agregarTarea(tarea) {
    const datos = new FormData();
    datos.append("nombre", tarea);
    datos.append("proyectoid", obtenerProyecto());

    try {
      const url = `${location.origin}/api/tarea`;
      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();

      mostrarAlerta(
        resultado.mensaje,
        resultado.tipo,
        document.querySelector(".formulario legend")
      );

      if (resultado.tipo === "exito") {
        document.querySelector("#tarea").value = "";

        const tareaObj = {
          id: String(resultado.id),
          nombre: tarea,
          estado: 0,
          proyectoid: resultado.proyectoid,
        };

        tareas = [...tareas, tareaObj];

        mostrarTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function obtenerProyecto() {
    const proyectoParams = new URLSearchParams(window.location.search);
    const proyecto = Object.fromEntries(proyectoParams.entries());
    return proyecto.url;
  }

  function limpiarTareas() {
    const listadoTareas = document.querySelector("#listado-tareas");
    while (listadoTareas.firstChild) {
      listadoTareas.removeChild(listadoTareas.firstChild);
    }
  }
})();
