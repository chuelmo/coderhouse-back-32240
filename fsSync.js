const fs = require('fs')
const { fileURLToPath } = require('url')

fs.writeFileSync('ejemplo.txt', 'Hola, Coders, estoy en un archivo')

if (fs.existsSync('ejemplo.txt')) {
    let contenido = fs.readFileSync('ejemplo.txt', 'utf-8')
    console.log(contenido)
    fs.appendFileSync('ejemplo.txt', 'Un poco más de contenido')
    contenido = fs.readFileSync('ejemplo.txt', 'utf-8')
    console.log(contenido)
    fs.unlinkSync('ejemplo.txt')
}

