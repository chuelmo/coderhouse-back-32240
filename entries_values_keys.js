const impuestos = {
    'impuesto1': 2323,
    'impuesto2': 1212,
    'impuesto3': 1523,
    'impuesto4': 12342
}

let parLlaveValor = Object.entries(impuestos)
console.log(parLlaveValor)

let soloPropiedades = Object.keys(impuestos)
console.log(soloPropiedades)

let soloValores = Object.values(impuestos)
console.log(soloValores)

let impuestosTotales = soloValores.reduce((valorInicial, valorAcumulado) => valorInicial + valorAcumulado)
console.log(impuestosTotales)