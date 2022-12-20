import fs from 'fs'

// console.log(Math.max([]))
// let respuesta = true
// try {
//     await fs.promises.access('no_file', fs.constants.F_OK)
// } catch (e) {
//     respuesta = false
// }
// console.log(respuesta)

// const asyncOperation = async () => {
//     const contenidoString = await fs.promises.readFile('./package.json', 'utf-8')
//     const contenidoObj = JSON.parse(contenidoString)
//     const size = contenidoString.length
//     const info = {
//         contenidoString,
//         contenidoObj,
//         size,
//     }
//     fs.promises.appendFile('./info.json', JSON.stringify(info))
//     console.log(info)
// }

// asyncOperation()
const makeRandomString = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const makeRandomPrice = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min

console.log(makeRandomString(12));
console.log(makeRandomPrice(345, 2789))