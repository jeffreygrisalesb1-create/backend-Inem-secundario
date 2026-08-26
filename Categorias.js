const API = "http://localhost:3000/api/Categorias";

const frm = document.getElementById("frmCategoria");

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value
    
   
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
      notificar(json.mensaje || "categoria registrada");

      frm.reset();
      cargarCategorias();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codCategoria").value;
 
  if (!id) {
    notificar("Debe ingresar el código de la categoria", "orange");

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
      notificar(json.mensaje || "categoria actualizada");
      frm.reset();
      cargarCategorias();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarCategorias() {
  try {
    const respuesta = await fetch(API);

    const Categorias = await respuesta.json();

    const tbody = document.getElementById("tablaCategorias");

    tbody.innerHTML = "";

    Categorias.forEach((Categoria) => {
      tbody.innerHTML += `
                <tr>

                    <td>${Categoria.codCategoria}</td>
                    <td>${Categoria.nombre}</td>
                    
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarCategoria(${JSON.stringify(Categoria).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar las Categorias", "red");
  }
}

function seleccionarCategorias(Categoria) {
  document.getElementById("codCategoria").value = Categoria.codCategoria;
  document.getElementById("nombre").value = Categoria.nombre;
 


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
});