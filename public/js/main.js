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

function clickEnBorrar(e) {
  console.log(`hizo click en borrar con el id: ${e.target.id}`);
}

function clickEnEdit(e) {
  console.log(`hizo click en edit con el id: ${e.target.id}`);
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
                        <img src="./images/edit-back.png" alt="edit" class="img-top" id="xc${p.id}">
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
