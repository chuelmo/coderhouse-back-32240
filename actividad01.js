/*
Almacenar fecha y hora

Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual. Posteriormente leer el archivo y mostrar el contenido por consola. 
Utilizar el módulo fs y sus operaciones de tipo callback.

*/
const fs = require('fs')
let ahora = new Date()
let fecha = ahora.toISOString()
fs.writeFile('fechaHora.txt', fecha, (error) => {
    if (error) {
        return console.log('Error al escribir el archivo')
    }
    fs.readFile('fechaHora.txt', 'utf-8', (error, resultado) => {
        if (error) {
            return console.log('Error al leer el archivo')
        }
        console.log(resultado)
        console.log('\n====================\nOperación terminada')
    })
})