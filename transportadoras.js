const API = "http://localhost:3000/api/transportadoras";

const frm = document.getElementById("frmtransportadoras");

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value,
    
    
   
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
      notificar(json.mensaje || "transportadora registrada");

      frm.reset();
      cargarPaises();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codtransportadora").value;
 
  if (!id) {
    notificar("Debe ingresar el código de la transportadora", "orange");

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
      notificar(json.mensaje || "transportadora actualizada");
      frm.reset();
      cargartransportadoras();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargartransportadoras() {
  try {
    const respuesta = await fetch(API);

    const transportadoras = await respuesta.json();

    const tbody = document.getElementById("tablatransportadoras");

    tbody.innerHTML = "";

    transportadoras.forEach((transportadora) => {
      tbody.innerHTML += `
                <tr>

                    
                    <td>${transportadora.nombre}</td>
                    
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionartransportadora(${JSON.stringify(transportadoras).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar las transportadoras", "red");
  }
}

function seleccionartransportadora(transportadoras) {
  document.getElementById("codtransportadora").value = transportadoras.Codtransportadora;
  document.getElementById("nombre").value = transportadoras.nombre;
 


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargartransportadoras();
});