let contador = () => {
    let cont = 1
    console.log('Realizando operación')
    let timer = setInterval(() => {
        console.log(cont++)
        if (cont > 5) {
            clearInterval(timer)
        }
    }, 1000)
}

console.log('Iniciando tarea')
contador()
console.log('Tarea finalizada')