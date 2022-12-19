const temporizador = (callback) => {
    setTimeout(() => {
        callback()
    }, 5000)
}

let operacion = () => {
    console.log('Realizando operación')
}

console.log('Iniciando tarea')
temporizador(operacion)
console.log('Tarea finalizada.')