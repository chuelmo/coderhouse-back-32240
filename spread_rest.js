let objeto1 = {
    propiedad1: 2,
    propiedad2: "b",
    propiedad3: true
}
let objeto2 = {
    propiedad1: "c",
    propiedad2: [2,3,5,6,7]
}
let { propiedad1, propiedad2 } = objeto1
let objeto3 = { ...objeto1, ...objeto2 }

console.log(objeto3)
console.log(propiedad1, propiedad2)