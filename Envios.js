const API = "http://localhost:3000/api/Envios";

const frm = document.getElementById("frmEnvios");

function obtenerDatosFormulario() {
  return {
    CodEnvio: document.getElementById("CodEnvio").value,
    CodCiudadO: document.getElementById("CodCiudadO").value,
    CodCiudadD: document.getElementById("CodCiudadD").value,
    CodTransporte: document.getElementById("CodTransporte").value,
    FechaE: document.getElementById("FechaE").value,
    FechaL: document.getElementById("FechaL").value,
    Direccion: document.getElementById("Direccion").value,
    CodCompra: document.getElementById("CodCompra").value
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
      notificar(json.mensaje || "Envio registrado");

      frm.reset();
      cargarEnvios();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codEnvio").value;
 
  if (!id) {
    notificar("Debe ingresar el código de el envio", "orange");

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
      notificar(json.mensaje || "Envio actualizado");
      frm.reset();
      cargarEnvios();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarEnvios() {
  try {
    const respuesta = await fetch(API);

    const Envios = await respuesta.json();

    const tbody = document.getElementById("tablaEnvios");

    tbody.innerHTML = "";

    Envios.forEach((Envio) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Envios.CodEnvio}</td>
                    <td>${Envios.CodCiudadO}</td>
                    <td>${Envios.CodCiudadD}</td>
                    <td>${Envios.CodTransporte}</td>
                    <td>${Envios.FechaE}</td>
                    <td>${Envios.FechaL}</td>
                    <td>${Envios.Direccion}</td>
                    <td>${Envios.CodCompra}</td>

                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarEnvio(${JSON.stringify(Envios).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar los Envios", "red");
  }
}

function seleccionarEnvios(Envios) {
  document.getElementById("CodEnvio").value = Envios.CodEnvio;
  document.getElementById("CodCiudadO").value = Envios.CodCiudadO;
  document.getElementById("CodCiudadD").value = Envios.CodCiudadD;
  document.getElementById("CodTransporte").value = Envios.CodTransporte;
  document.getElementById("FechaE").value = Envios.FechaE;
  document.getElementById("FechaL").value = Envios.FechaL;
  document.getElementById("Direccion").value = Envios.Direccion;
  document.getElementById("CodCompra").value = Envios.CodCompra;

  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarEnvios();
});