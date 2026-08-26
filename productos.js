const API = "http://localhost:3000/api/productos";

const frm = document.getElementById("frmproductos");

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    CatPro_id:  document.getElementById("CatPro_id").value
   
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
      notificar(json.mensaje || "producto registrado");

      frm.reset();
      cargarProductos();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codproducto").value;
 
  if (!id) {
    notificar("Debe ingresar el código de el producto", "orange");

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
      notificar(json.mensaje || "producto actualizado");
      frm.reset();
      cargarproductos();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

async function cargarproductos() {
  try {
    const respuesta = await fetch(API);

    const productos = await respuesta.json();

    const tbody = document.getElementById("tablaproductos");

    tbody.innerHTML = "";

    productos.forEach((producto) => {
      tbody.innerHTML += `
                <tr>

                    <td>${producto.Codproducto}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.CatPro_id}</td>
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarproducto(${JSON.stringify(producto).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar los productos", "red");
  }
}

function seleccionarproductos(productos) {
  document.getElementById("codproducto").value = productos.Codproducto;
  document.getElementById("nombre").value = productos.nombre;
  document.getElementById("precio").value = productos.precio;
  document.getElementById("CatPro_id").value = productos.CatPro_id;


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});