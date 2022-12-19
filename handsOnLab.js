import ManagerUsuarios from './ManagerUsuarios.js'

const usuarios = new ManagerUsuarios('Usuarios.json')
let allUsers = await usuarios.getAllUsers()
console.log(allUsers)
await usuarios.createUser('Juan', 'Pueblo', 22, 'Back-32240')
allUsers = await usuarios.getAllUsers()
console.log(allUsers)