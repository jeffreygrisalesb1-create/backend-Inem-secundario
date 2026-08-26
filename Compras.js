const API = "http://localhost:3000/api/Compras";

const frm = document.getElementById("frmCompras");

function obtenerDatosFormulario() {
  return {
    CodCompra: document.getElementById("CodCompra").value,
    fecha: document.getElementById("fecha").value,
    CodCliente: document.getElementById("CodCliente").value,
    CodEmpleado: document.getElementById("CodEmpleado").value,   
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
      notificar(json.mensaje || "Compra registrado");

      frm.reset();
      cargarCompras();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("CodCompra").value;
 
  if (!id) {
    notificar("Debe ingresar el código de la compra", "orange");

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
      notificar(json.mensaje || "Compra actualizada");
      frm.reset();
      cargarCompras();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarCompras() {
  try {
    const respuesta = await fetch(API);

    const Compras = await respuesta.json();

    const tbody = document.getElementById("tablaCompras");

    tbody.innerHTML = "";

    Compras.forEach((Compra) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Compras.Codcompra}</td>
                    <td>${Compras.feach}</td>
                    <td>${Compras.Codcliente}</td>
                    <td>${Compras.Codempleado}</td>
                  
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarCompra(${JSON.stringify(Compras).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar las Compras", "red");
  }
}

function seleccionarCompra(Compras) {
  document.getElementById("Codcompra").value = Compras.Codcompra;
  document.getElementById("Fecha").value = Compras.fecha;
  document.getElementById("Codcliente").value = Compras.Codcliente;
  document.getElementById("Codempleado").value = Compras.Codempleado;


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCompras();
});