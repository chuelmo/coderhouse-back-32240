const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if (divisor === 0) {
            reject('No se pueden hacer divisiones entre cero')
        } else {
            resolve(dividendo/divisor)
        }
    })
}

const suma = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 === 0 || n2 === 0) {
            reject('Operación innecesaria')
        } else {
            resolve(n1 + n2)
        }
    })
}

const resta = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 === 0 || n2 === 0) {
            reject('Operación inválida')
        } else if (n1 - n2 < 0) {
            reject('La calculadora solo puede devolver valores positivos')
        } else {
            resolve(n1 - n2)
        }
    })
}

const multiplicacion = (n1, n2) => {
    return new Promise((resolve, reject) => {
        if (n1 < 0 || n2 < 0) {
            reject('La calculadora solo puede devolver valores positivos')
        } else {
            resolve(n1 * n2)
        }
    })
}

const calculos = async (op, n1, n2) => {
    try {
        let resultado
        switch (op) {
            case 'sumar':
                resultado = await suma(n1, n2)
                console.log(resultado)
                break
            case 'restar':
                resultado = await resta(n1, n2)
                console.log(resultado)
                break
            case 'multiplicar':
                resultado = await multiplicacion(n1, n2)
                console.log(resultado)
                break
            case 'dividir':
                resultado = await dividir(n1, n2)
                console.log(resultado)
                break
            default:
                console.log('Operación no reconocida')
        }
    } catch (error) {
        console.log(error)
    }
}

calculos('sumar', 0, 5)
calculos('restar', 0, 7)
calculos('multiplicar', -1, 3)
calculos('dividir', 34, 0)