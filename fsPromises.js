const fs = require('fs')

const operacionesAsincronas = async () => {
    await fs.promises.writeFile('ejemplo.txt', 'Hola hermosa promesa!')
    let resultado = await fs.promises.readFile('ejemplo.txt', 'utf-8')
    console.log(resultado)
    await fs.promises.appendFile('ejemplo.txt', ' Contenido adicional en la promesa')
    resultado = await fs.promises.readFile('ejemplo.txt', 'utf-8')
    console.log(resultado)
    await fs.promises.unlink('ejemplo.txt')
}

operacionesAsincronas()