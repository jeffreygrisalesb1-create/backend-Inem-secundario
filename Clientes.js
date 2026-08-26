const API = "http://localhost:3000/api/Clientes";

const frm = document.getElementById("frmClientes");

function obtenerDatosFormulario() {
  return {
    Cliente_id: document.getElementById("Cliente_id").value,
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
      notificar(json.mensaje || "Cliente registrado");

      frm.reset();
      cargarClientes();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("Codcliente").value;
 
  if (!id) {
    notificar("Debe ingresar el código del cliente", "orange");

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
      notificar(json.mensaje || "cliente actualizada");
      frm.reset();
      cargarClientes();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarClientes() {
  try {
    const respuesta = await fetch(API);

    const Clientes = await respuesta.json();

    const tbody = document.getElementById("tablaClientes");

    tbody.innerHTML = "";

    Clientes.forEach((Cliente) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Clientes.Codcliente}</td>
                    <td>${Clientes.nombre}</td>
                    <td>${Clientes.correo}</td>
                    <td>${Clientes.telefono}</td>
                    <td>${Clientes.dni}</td>
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarCliente(${JSON.stringify(Clientes).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar los Clientes", "red");
  }
}

function seleccionarCliente(Cliente) {
  document.getElementById("Codcliente").value = Clientes.Codcliente;
  document.getElementById("nombre").value = Clientes.nombre;
  document.getElementById("correo").value = Clientes.correo;
  document.getElementById("telefono").value = Clientes.telefono;
  document.getElementById("dni").value = Clientes.dni;


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
});