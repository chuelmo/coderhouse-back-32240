const socket = io.connect();

let deleteButtons;
let editButtons;

const avatar = "avatar" + getRandomInt(1, 8) + ".png";
let usuario = "XnobodyX_";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  let id = e.target.id.slice(2);
  deleteProduct(id);
}

function clickEnEdit(e) {
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

function enviarMensaje(evt) {
  if (evt.key === "Enter") {
    const frase = input_msg.value.trim();
    if (frase.length > 0) {
      let today = new Date();
      let ahora = today.toLocaleString();
      if (frase.substring(0, 1) === "/") {
        if (usuario === "XnobodyX_") {
          let texto = frase.substring(1);
          let campos = texto.split(" ");
          if (campos.length > 1) {
            if (campos[0] === "join") {
              usuario = campos[1];
            }
          }
        }
        input_msg.value = "";
      } else if (usuario !== "XnobodyX_") {
        input_msg.value = "";
        const mensaje = {
          user: usuario,
          date: ahora,
          message: frase,
          avatar: avatar,
        };
        fetch("/api/messages", {
          method: "POST",
          body: JSON.stringify({ msg: mensaje }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            res
              .json()
              .then((response) => {
                console.log("Success:", response);
                socket.emit("new-message");
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  }
}

const boton = document.getElementById("enviar");
boton?.addEventListener("click", enviarDatos);
addActionsToButtons();

const input_msg = document.getElementById("msg_input_text");
const msg_textarea = document.getElementById("msg_textarea");
input_msg?.addEventListener("keyup", enviarMensaje);

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

socket.on("all_mensajes", (mensajes) => {
  let html = "";
  if (mensajes.length > 0) {
    mensajes.forEach((m) => {
      if (m.user === usuario) {
        html += `
        <div class="chat-message-right mb-4">
          <div>
              <img src="./images/${m.avatar}"
                  class="rounded-circle mr-1" alt="usuario" width="40" height="40">
              <div class="text-muted small text-nowrap mt-2">${m.date}</div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
              <div class="font-weight-bold mb-1">${usuario}</div>
              ${m.message}
          </div>
        </div>`;
      } else {
        html += `
          <div class="chat-message-left pb-4">
            <div>
                <img src="./images/${m.avatar}"
                    class="rounded-circle mr-1" alt="usuario" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${m.date}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">${m.user}</div>
                ${m.message}
            </div>
          </div>`;
      }
    });
    msg_textarea.innerHTML = html;
  }
});
