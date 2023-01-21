const socket = io.connect();
                
function enviarDatos() {
    let nombre = document.getElementById('title');
    let desc = document.getElementById('description');
    let code = document.getElementById('code');
    let price = document.getElementById('price');
    let status = document.getElementById('status');
    let stock = document.getElementById('stock');
    let category = document.getElementById('category');
    let urlfoto = document.getElementById('url');
    let producto = {
        "title": nombre.value,
        "description": desc.value,
        "code": code.value,
        "price": price.value * 1,
        "status": false,
        "stock": stock.value * 1,
        "category": category.value
    };

    fetch('/api/products', {
        method: 'POST', 
        body: JSON.stringify({ "product": producto }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        res.json()
            .then((response) => {
                console.log('Success:', response);
                nombre.value = '';
                desc.value = '';
                code.value = '';
                price.value = '';
                status.value = false;
                stock.value = '';
                category.value = '';
                urlfoto.value = '';
                socket.emit('new-product');
            })
            .catch((e) => console.log(e));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const boton = document.getElementById('enviar');
boton?.addEventListener('click', enviarDatos);

socket.on('all_productos', productos => {
    div_prod = document.getElementById('productos');
    let html = '';
    if (productos.length > 0) {
        html = `
        <table class="table bg-dark">
        <tr>
            <th class="text-warning">Nombre</th>
            <th class="text-warning">Precio</th>
            <th class="text-warning">Imagen</th>
        </tr>`;
        productos.forEach(p => {
            html += `
            <tr>
                <td class="text-white">${p.title}</td>
                <td class="text-white">${p.price}</td>
                <td class="text-white"><img src="${p.thumbnails[0]}" alt="imagen" height="64"></td>
            </tr>`;
        });
        html += `</table>`;
    } else {
        html = `<p class="mt-3 mb-3 p-3 aviso">No se encontraron productos</p>`;
    }
    div_prod.innerHTML = html;
});

