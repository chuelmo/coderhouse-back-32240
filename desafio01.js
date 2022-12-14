/* Clases con ECMAScript y ECMAScript avanzado
Consigna
✓ Realizar una clase “ProductManager” que gestione un conjunto de productos.

Aspectos a incluir
✓ Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

✓ Cada producto que gestione debe contar con las propiedades:
- title (nombre del producto)
- description (descripción del producto)
- price (precio)
- thumbnail (ruta de imagen)
- code (código identificador)
- stock (número de piezas disponibles)

✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
- Validar que no se repita el campo “code” y que todos los campos sean obligatorios
- Al agregarlo, debe crearse con un id autoincrementable

✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

✓ Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
- En caso de no coincidir ningún id, mostrar en consola un error “Not found”

Formato del entregable
✓ Archivo de Javascript listo para ejecutarse desde node.
*/

class ProductManager {
    #id

    constructor() {
        this.products = []
        this.#id = 0
    }

    #codeExists = (code) => {
        let response = false
        this.products.forEach(el => {
            if (el.code === code) {
                response = true
                return
            }
        })
        return response
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (typeof title === 'undefined' || title === null) {
            return {'Error': true, 'Description': 'The title is required'}
        }
        if (typeof description === 'undefined' || description === null) {
            return {'Error': true, 'Description': 'The description is required'}
        }
        if (typeof price === 'undefined' || price === null) {
            return {'Error': true, 'Description': 'The description is required'}
        }
        if (typeof thumbnail === 'undefined' || thumbnail === null) {
            return {'Error': true, 'Description': 'The description is required'}
        }
        if (typeof code === 'undefined' || code === null) {
            return {'Error': true, 'Description': 'The description is required'}
        }
        if (typeof stock === 'undefined' || stock === null) {
            return {'Error': true, 'Description': 'The description is required'}
        }
        if (this.#codeExists(code)) {
            return {'Error': true, 'Description': 'The code is alredy used'}
        }
        this.#id += 1
        const product = {
            'id': this.#id,
            'title': title,
            'description': description,
            'price': price,
            'thumbnail': thumbnail,
            'code': code,
            'stock': stock
        }
        this.products.push(product)
        return {'Success': true, 'Description': 'Product added', 'Product': product}
    }

    getProducts = () => this.products

    getProductById = (id) => {
        let msg = {'Error': true, 'Description': 'Not found'}
        this.products.forEach(el => {
            if (el.id === id) {
                msg = {'Success': true, 'Description': 'Product found', 'Product': el}
                return
            }
        })
        return msg
    }
}

// Proceso de testing del desafío

const pm = new ProductManager()
console.log(pm.getProducts())
console.log()
console.log(
    pm.addProduct(
        'producto prueba',
        'Este es un producto prueba',
        200,
        'Sin imagen',
        'abc123',
        25
    )
)
console.log()
console.log(pm.getProducts())
console.log()
console.log(
    pm.addProduct(
        'producto prueba',
        'Este es un producto prueba',
        200,
        'Sin imagen',
        'abc123',
        25
    )
)
console.log()
console.log(pm.getProductById(100))
console.log()
console.log(pm.getProductById(1))

