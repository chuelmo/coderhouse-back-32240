const socket = io.connect();

let deleteButtons;
let editButtons;

function enviarDatos() {
  let nombre = document.getElementById("title");
  let desc = document.getElementById("description");
  let code = document.getElementById("code");
  let price = document.getElementById("price");
  let status = document.getElementById("status");
  let stock = document.getElementById("stock");
  let category = document.getElementById("category");
  let urlfoto = document.getElementById("url");
  let producto = {
    title: nombre.value,
    description: desc.value,
    code: code.value,
    price: price.value * 1,
    status: status.checked ? true : false,
    stock: stock.value * 1,
    category: category.value,
  };

  fetch("/api/products", {
    method: "POST",
    body: JSON.stringify({ product: producto }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res
        .json()
        .then((response) => {
          console.log("Success:", response);
          nombre.value = "";
          desc.value = "";
          code.value = "";
          price.value = "";
          status.checked = true;
          stock.value = "";
          category.value = "";
          urlfoto.value = "";
          socket.emit("new-product");
        })
        .catch((e) => console.log(e));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteProduct(id) {
  fetch(`/api/products/${id}`, {
    method: "DELETE",
  }).then((response) => {
    response.json().then((res) => {
      if (res.success) {
        console.log(`Se eliminó el producto con id ${id}`);
        socket.emit("new-product");
      }
    });
  });
}

function updateProduct(e) {
  console.log(
    `Hiciste click en el boton update product con el id ${e.target.id}`
  );
  let campos = e.target.id.split(":");
  let id = campos[1];
  let nombre = campos[2];
  let precio = campos[3];
  let newName = document.getElementById("title_update").value;
  let newPrice = document.getElementById("price_update").value;
  nombre = newName || nombre;
  precio = newPrice || precio;
  fetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ product: { id: id, title: nombre, price: precio } }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json().then((res) => {
      if (res.success) {
        console.log(`Se actualizó el producto con id ${id}`);
        socket.emit("new-product");
      }
    });
  });
}

function createFormUpdateProduct(id, nombre, precio) {
  let formulario = `<form class="row g-3">
                      <div class="col-12">
                          <label for="id_update" class="form-label">Id</label>
                          <input type="text" class="form-control" id="id_update" value="${id}" disabled>
                      </div>
                      <div class="col-12">
                          <label for="title_update" class="form-label">Nombre</label>
                          <input type="text" class="form-control" id="title_update" value="${nombre}">
                      </div>
                      <div class="col-12">
                          <label for="price_update" class="form-label">Precio</label>
                          <input type="number" class="form-control" id="price_update" value="${precio}">
                      </div>
                    </form>`;
  let botones = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="update:${id}:${nombre}:${precio}">Guardar</button>`;
  const modal_body = document.getElementById("modal_id");
  modal_body.innerHTML = formulario;
  const modal_footer = document.getElementById("id_modal_footer");
  modal_footer.innerHTML = botones;
  let button_update = document.getElementById(
    `update:${id}:${nombre}:${precio}`
  );
  button_update.addEventListener("click", updateProduct);
}

function clickEnBorrar(e) {
  console.log(`hizo click en borrar con el id: ${e.target.id}`);
  let id = e.target.id.slice(2);
  deleteProduct(id);
}

function clickEnEdit(e) {
  console.log(`hizo click en edit con el id: ${e.target.id}`);
  let campos = e.target.id.split(":");
  let id = campos[0].slice(2);
  let nombre = campos[1];
  let precio = campos[2];
  createFormUpdateProduct(id, nombre, precio);
}

function addActionsToButtons() {
  deleteButtons = document.querySelectorAll(".borrar");
  editButtons = document.querySelectorAll(".cambiar");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", clickEnBorrar);
  }

  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", clickEnEdit);
  }
}

const boton = document.getElementById("enviar");
boton?.addEventListener("click", enviarDatos);
addActionsToButtons();

const input_msg = document.getElementById("msg_input_text");
const msg_textarea = document.getElementById("msg_textarea");
input_msg.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    const frase = input_msg.value.trim();
    if (frase.length > 0) {
      if (frase.substring(0, 1) === "/") {
        msg_textarea.value += "COMANDO: " + frase.substring(1) + "\n";
        input_msg.value = "";
      } else {
        msg_textarea.value += frase + "\n";
        input_msg.value = "";
      }
    }
  }
});

socket.on("all_productos", (productos) => {
  div_prod = document.getElementById("productos");
  let html = "";
  if (productos.length > 0) {
    html = `
        <table class="table bg-dark">
        <tr>
            <th class="text-warning">Nombre</th>
            <th class="text-warning">Precio</th>
            <th class="text-warning">Imagen</th>
            <th class="text-warning">Actions</th>
        </tr>`;
    productos.forEach((p) => {
      html += `
            <tr>
                <td class="text-white">${p.title}</td>
                <td class="text-white">${p.price}</td>
                <td class="text-white"><img src="${p.thumbnails[0]}" alt="imagen" height="64"></td>
                <td class="text-white">
                    <div class="actions cambiar" id="xa${p.id}">
                        <img src="./images/edit-front.png" alt="edit" id="xn${p.id}">
                        <img src="./images/edit-back.png" alt="edit" class="img-top" id="xc${p.id}:${p.title}:${p.price}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    </div>
                    <div class="actions borrar" id="xt${p.id}">
                        <img src="./images/delete-front.png" alt="delete" id="xb${p.id}">
                        <img src="./images/delete-back.png" alt="delete" class="img-top" id="xd${p.id}">
                    </div>
                </td>
            </tr>`;
    });
    html += `</table>`;
    div_prod.innerHTML = html;
    addActionsToButtons();
  } else {
    html = `<p class="mt-3 mb-3 p-3 aviso">No se encontraron productos</p>`;
    div_prod.innerHTML = html;
  }
});
