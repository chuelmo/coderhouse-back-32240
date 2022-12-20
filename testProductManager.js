import ProductManager from "./ProductManager.js";

const makeRandomString = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const makeRandomPrice = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min

const title = makeRandomString(7)
const description = makeRandomString(15)
const price = makeRandomPrice(50, 7560)
const thumbnail = makeRandomString(10)
const code = makeRandomString(6)
const stock = makeRandomPrice(0, 15)

const products = new ProductManager('Products.json')
let allProducts = await products.getProducts()
console.log('Todos los artículos que se encuentran en el archivo Products.json')
console.log(allProducts)
const testProduct = await products.addProduct(title, description, price, thumbnail, code, stock)
console.log(`\nSe agregó el artículo con id: ${testProduct.id}`)
console.log(`\nSe recupera el artículo con id: ${testProduct.id}`)
let p = await products.getProductById(testProduct.id)
console.log(p)
const newTitle = makeRandomString(7)
await products.updateProduct(testProduct.id, { 'title': newTitle })
console.log(`Se modifica el title al artículo con id: ${testProduct.id}`)
allProducts = await products.getProducts()
console.log(allProducts)
await products.deleteProduct(testProduct.id)
console.log(`Se borró el artículo con id: ${testProduct.id}`)
allProducts = await products.getProducts()
console.log(allProducts)