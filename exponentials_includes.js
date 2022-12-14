let valoresBase = [1, 2, 3, 4, 5, 6]
let nuevosValores = valoresBase.map((nro, indice) => nro ** indice)
console.log(nuevosValores)

let nombres = ['Juan', 'Camilo', 'Maria', 'Ana', 'Humberto']
if (nombres.includes('Camilo')) {
    console.log('Camilo si aparece dentro del array')
} else {
    console.log('Camilo no se encuentra en el array')
}