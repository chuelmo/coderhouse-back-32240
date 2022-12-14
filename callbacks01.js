let valoresOriginales = [1, 2, 3, 4, 5]
let nuevosValores = valoresOriginales.map(x => x + 1)
let otrosValores = valoresOriginales.map(x => x * 2)
let masValores = valoresOriginales.map(x => "a")

const funcionCallback = (valor) => {
    if (valor % 2 === 0) {
        return valor
    } else {
        return "no es par"
    }
}

const evaluacionDePares = valoresOriginales.map(funcionCallback)
console.log(evaluacionDePares)