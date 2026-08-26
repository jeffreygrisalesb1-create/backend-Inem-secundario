const API = "http://localhost:3000/api/vehiculos";

const frm = document.getElementById("frmvehiculos");

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById("nombre").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    placa: document.getElementById("placa").value,
    color: document.getElementById("color").value,
    cantidad: document.getElementById("cantidad").value,
    Categoria_id: document.getElementById("Categoria_id").value,
    precio: document.getElementById("precio").value
    
    
   
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
      notificar(json.mensaje || "vehiculo registrado");

      frm.reset();
      cargarvehiculos();
    } else {
      notificar(json.mensaje || "Error", "red");
    }
  } catch (error) {
    console.error(error);

    notificar("No fue posible conectarse con la API", "red");
  }
});

document.getElementById("btnActualizar").addEventListener("click", async () => {
  const id = document.getElementById("codvehiculo").value;
 
  if (!id) {
    notificar("Debe ingresar el código de el vehiculo", "orange");

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
      notificar(json.mensaje || "vehiculo actualizado");
      frm.reset();
      cargarvehiculos();
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

    const vehiculos = await respuesta.json();

    const tbody = document.getElementById("tablavehiculos");

    tbody.innerHTML = "";

    vehiculos.forEach((vehiculo) => {
      tbody.innerHTML += `
                <tr>

                    
                    <td>${vehiculo.nombre}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.placa}</td>
                    <td>${vehiculo.color}</td>
                    <td>${vehiculo.cantidad}</td>
                    <td>${vehiculo.Categoria_id}</td>
                    <td>${vehiculo.precio}</td>
                    
                   

                    <td>

                        <button
                            class="btn-small blue"
                            onclick="seleccionarvehiculo(${JSON.stringify(vehiculos).replace(/"/g, "&quot;")})">

                            Editar

                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error(error);

    notificar("No fue posible cargar las vehiculos", "red");
  }
}

function seleccionarvehiculo(vehiculos) {
  document.getElementById("codvehiculo").value = vehiculos.Codvehiculo;
  document.getElementById("nombre").value = vehiculos.nombre;
  document.getElementById("marca").value = vehiculos.marca;
  document.getElementById("modelo").value = vehiculos.modelo;
  document.getElementById("placa").value = vehiculos.placa;
  document.getElementById("color").value = vehiculos.color;
  document.getElementById("cantidad").value = vehiculos.cantidad;
  document.getElementById("Categoria_id").value = vehiculos.Categoria_id;
  document.getElementById("precio").value = vehiculos.precio;
 


  // Actualiza las etiquetas de Materialize
  M.updateTextFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarvehiculos();
});