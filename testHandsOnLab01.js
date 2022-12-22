import UserManager from "./handsOnLab01.js";

const makeRandomString = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const users = new UserManager('Usuarios.json')
let allUsers = await users.getUsers()
console.log('Estos son todos los usuarios que hay en Usuarios.json')
console.log(allUsers)
const testUser = await users.createUser(makeRandomString(6),makeRandomString(6), makeRandomString(6), makeRandomString(6))
console.log(`\nSe agregó el usuario con id: ${testUser.id}`)
console.log(`\nSe recupera el usuario con id: ${testUser.id}`)
let u = await users.getUserById(testUser.id)
console.log(u)
await users.updateUser(testUser.id, { 'nombre': makeRandomString(6) })
console.log(`Se modifica el nombre al usuario con id: ${testUser.id}`)
allUsers = await users.getUsers()
console.log(allUsers)
try {
    await users.createUser('Peter', 'Parker', 'spider', 'spiderman')
} catch (e) {
    console.log('El usuario con el nickname spider ya existe')
}

console.log(await users.validarUser('superman', 'superman'))
console.log(await users.validarUser('spider', 'cielo rojo'))
console.log(await users.validarUser('spider', 'spiderman'))
