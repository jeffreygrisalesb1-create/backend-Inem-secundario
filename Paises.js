const API = "http://localhost:3000/api/Paises";

const frm = document.getElementById("frmPaises");

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value,
    CodPais: document.getElementById("CodPais").value
   
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
      notificar(json.mensaje || "Pais registrado");

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
  const id = document.getElementById("codPais").value;
 
  if (!id) {
    notificar("Debe ingresar el código de el pais", "orange");

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
      notificar(json.mensaje || "Pais actualizado");
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

async function cargarPaises() {
  try {
    const respuesta = await fetch(API);

    const Paises = await respuesta.json();

    const tbody = document.getElementById("tablaPaises");

    tbody.innerHTML = "";

    Paises.forEach((Pais) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Paises.CodPais}</td>
                    <td>${Paises.nombre}</td>
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarPais(${JSON.stringify(Paises).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar los estudiantes", "red");
  }
}

function seleccionarPais(Paises) {
  document.getElementById("codPais").value = Paises.CodPais;
  document.getElementById("nombre").value = Paises.nombre;


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarPaises();
});