const API = "http://localhost:3000/api/Ciudades";

const frm = document.getElementById("frmCiudades");

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value,
    pais_id: document.getElementById("pais_id").value
   
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
      notificar(json.mensaje || "Ciudad registrada");

      frm.reset();
      cargarCiudades();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codCiudad").value;
 
  if (!id) {
    notificar("Debe ingresar el código de la Ciudad", "orange");

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
      notificar(json.mensaje || "Ciudad actualizada");
      frm.reset();
      cargarCiudades();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarCiudades() {
  try {
    const respuesta = await fetch(API);

    const Ciudades = await respuesta.json();

    const tbody = document.getElementById("tablaCiudades");

    tbody.innerHTML = "";

    Ciudades.forEach((Ciudad) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Ciudades.Codciudad}</td>
                    <td>${Ciudades.nombre}</td>
                    <td>${Ciudades.pais_id}</td>
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarCiudad(${JSON.stringify(Ciudades).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar las Ciudades", "red");
  }
}

function seleccionarCiudad(Ciudades) {
  document.getElementById("Codciudad").value = Ciudades.Codciudad;
  document.getElementById("nombre").value = Ciudades.nombre;
  document.getElementById("pais_id").value = Ciudades.pais_id;


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCiudades();
});