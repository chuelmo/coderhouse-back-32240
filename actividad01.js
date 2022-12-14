const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces:2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]

const nuevoArray = []
let total = 0
objetos.forEach(obj => {
    let valores = Object.values(obj)
    total += valores.reduce((inicio, suma) => inicio + suma)
    claves = Object.keys(obj)
    claves.forEach(el => {
        if (!nuevoArray.includes(el)) {
            nuevoArray.push(el)
        }
    })
})
console.log(nuevoArray)
console.log('Total vendido: ' + total)
