/* 
Crear un servidor con el módulo nativo de nodejs “http”. Setear una respuesta que contenga el mensaje “¡Mi primer hola mundo desde backend!” 
El servidor debe escuchar en el puerto 8080.  (Correr con nodemon)
Probar el servidor desde el navegador.
Hacer algún cambio en código y corroborar que se reinicie automáticamente.
*/
const http = require('http')
const server = http.createServer((request, response) => {
    response.end('Hola Mundo en Coder!')
})

const PORT = 8080
server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})

