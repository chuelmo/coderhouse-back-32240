const fs = require('fs')

const leerArchivo = async nombre => {
    let contenidoStr = await fs.promises.readFile(nombre, 'utf-8')
    let contenidoObj = JSON.parse(contenidoStr)
    let size = (await fs.promises.stat(nombre)).size
    const info = {
        'contenidoStr': contenidoStr,
        'contenidoObj': contenidoObj,
        'size': size
    }
    return info
}

const resultado = async () => {
    const info = await leerArchivo('package.json')
    console.log(info)
}

resultado()
