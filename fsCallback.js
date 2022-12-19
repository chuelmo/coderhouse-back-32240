const fs = require('fs')
fs.writeFile('ejemplo.txt', 'Hola desde callback', (error) => {
    if (error) {
        return console.log('Error al escribir el archivo')
    }
    fs.readFile('ejemplo.txt', 'utf-8', (error, resultado) => {
        if (error) {
            return console.log('Error al leer el archivo')
        }
        console.log(resultado)
        fs.appendFile('ejemplo.txt', ' Un poco más de contenido', (error) => {
            if (error) {
                return console.log('Error al actualizar el archivo')
            }
            fs.readFile('ejemplo.txt', 'utf-8', (error, resultado) => {
                if (error) {
                    return console.log('Error al intentar leer el archivo luego de agregarle contenido')
                }
                console.log(resultado)
                fs.unlink('ejemplo.txt', error => {
                    if (error) {
                        return console.log('No se pudo eliminar el archivo')
                    }
                    console.log('Archivo eliminado correctamente')
                })
            })
        })
    })
})