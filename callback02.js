let arregloDePrueba = [1, 2, 3, 4, 5]

const miFuncionMap = (arreglo, callback) => {
    let nuevoArreglo = []
    for (let i = 0; i < arreglo.length; i++) {
        let nuevoValor = callback(arreglo[i])
        nuevoArreglo.push(nuevoValor)
    }
    return nuevoArreglo
}

let nuevoArregloPropio = miFuncionMap(arregloDePrueba, x => x * 2)
let nuevoArregloConMap = arregloDePrueba.map(x => x * 2)

Array.prototype.miPropiaFuncionMap = function(callback) {
    let nuevoArreglo = []
    for (let i = 0; i < this.length; i++) {
        let nuevoValor = callback(this[i])
        nuevoArreglo.push(nuevoValor)
    }
    return nuevoArreglo
}

let newArray = [1, 2, 3, 4, 5]
let newValues = newArray.miPropiaFuncionMap(x => x + 1)

console.log(newArray)
console.log(newValues)