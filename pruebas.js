import fs from 'fs'

console.log(Math.max([]))
let respuesta = true
try {
    await fs.promises.access('no_file', fs.constants.F_OK)
} catch (e) {
    respuesta = false
}
console.log(respuesta)