const API = "http://localhost:3000/api/Empleados";

const frm = document.getElementById("frmEmpleado");

function obtenerDatosFormulario() {
  return {
    CodEmpleado: document.getElementById("CodEmpleado").value,
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    telefono: document.getElementById("telefono").value,
    dni: document.getElementById("dni").value
  };
}

function notificar(mensaje, color = "green") {
  M.toast({
    html: mensaje,
    classes: color,
  });
}

document.getElementById("btnGuardar").addEventListener("click", async () => {
  try {
    const datos = obtenerDatosFormulario();

    const respuesta = await fetch(API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(datos),
    });

    const json = await respuesta.json();

    if (respuesta.ok) {
      notificar(json.mensaje || "Empleado registrado");

      frm.reset();
      cargarEmpleados();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codEmpleado").value;
 
  if (!id) {
    notificar("Debe ingresar el código de el empleado", "orange");

    return;
  }

  try {
    const datos = obtenerDatosFormulario();

    const respuesta = await fetch(`${API}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(datos),
    });

    const json = await respuesta.json();

    if (respuesta.ok) {
      notificar(json.mensaje || "Empleado actualizado");
      frm.reset();
      cargarEmpleados();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarEmpleados() {
  try {
    const respuesta = await fetch(API);

    const Empleados = await respuesta.json();

    const tbody = document.getElementById("tablaEmpleados");

    tbody.innerHTML = "";

    Empleados.forEach((Empleado) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Empleados.CodEmpleado}</td>
                    <td>${Empleados.nombre}</td>
                    <td>${Empleados.correo}</td>
                    <td>${Empleados.telefono}</td>
                    <td>${Empleados.dni}</td>
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarEmpleado(${JSON.stringify(Empleados).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar los Empleados", "red");
  }
}

function seleccionarEmpleado(Empleados) {
  document.getElementById("codEmpleados").value = Empleados.CodEmpleado;
  document.getElementById("nombre").value = Empleados.nombre;
  document.getElementById("Correo").value = Empleados.Correo;
  document.getElementById("telefono").value = Empleados.telefono;
  document.getElementById("dni").value = Empleados.dni;


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarEmpleados();
});