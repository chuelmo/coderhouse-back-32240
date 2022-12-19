import fs from 'fs'

export default class ManagerUsuarios {
    constructor(fileName) {
        this.path = fileName
        this.usuarios = []
        this.id = 0
    }

    async getAllUsers() {
        try {
            let users = await fs.promises.readFile(this.path, 'utf-8')
            this.usuarios = JSON.parse(users)
            return this.usuarios
        } catch (e) {
            throw new Error(e.message)
        }
        
    }

    async createUser(nombre, apellido, edad, curso) {
        try {
            await this.getAllUsers()
            if (nombre && apellido && edad && curso) {
                const usuario = {
                    'nombre': nombre,
                    'apellido': apellido,
                    'edad': edad,
                    'curso': curso
                }
                this.usuarios.push(usuario)
                await fs.promises.writeFile(this.path, JSON.stringify(this.usuarios))
            } else {
                throw new Error('All fields are required')
            }
        } catch (e) {
            throw new Error(e)
        }
    }
}
