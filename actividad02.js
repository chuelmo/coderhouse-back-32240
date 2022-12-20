import fs from 'fs'

const leerArchivo = async (nombre) => {
    try {
        let contenidoStr = await fs.promises.readFile(nombre, 'utf-8')
        let contenidoObj = JSON.parse(contenidoStr)
        let size = (await fs.promises.stat(nombre)).size
        const info = {
            'contenidoStr': contenidoStr,
            'contenidoObj': contenidoObj,
            'size': size
        }
        return info
    } catch (e) {
        throw new Error(e.message)
    }
}

const resultado = async () => {
    try {
        const info = await leerArchivo('package.json')
        console.log(info)
    } catch (e) {
        throw new Error(e)
    }
}

(async function main() {
    try {
        await resultado()
    } catch (e) {
        console.error(e)
    }
})()
