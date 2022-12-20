import ProductManager from "./ProductManager.js";

const products = new ProductManager('Products.json')
let allProducts = await products.getProducts()
console.log(allProducts)
// await products.addProduct('PC', 'HP Computer all in one', 1269, 'Without image', 'abc3245', 12)
// allProducts = await products.getProducts()
// console.log(allProducts)
let p = await products.getProductById(4)
console.log(p)
await products.updateProduct(4, { 'title': 'escapularte' })
allProducts = await products.getProducts()
console.log(allProducts)