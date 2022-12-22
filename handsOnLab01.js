import fs from 'fs'
const { createHmac } = await import('node:crypto')

export default class UserManager {
    constructor(path) {
        this.path = path
        this.users = []
        this.exists = false
    }

    // verifica que el archivo donde hacemos la persistencia exista
    async checkExists() {
        let exists = true
        try {
            await fs.promises.access(this.path, fs.constants.F_OK)
        } catch (e) {
            exists = false
        }
        this.exists = exists
        return exists
    }

    async getUsers() {
        try {
            if (this.exists === false) {
                let exists = await this.checkExists()
                if (exists === false) {
                    await fs.promises.writeFile(this.path, '[]')
                    this.exists = true
                }
            }
            let u = await fs.promises.readFile(this.path, 'utf-8')
            this.users = JSON.parse(u)
            return this.users
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async getMaxId() {
        try {
            await this.getUsers()
            const ids = this.users.map(el => el.id)
            if (ids.length === 0) {
                return 0
            }
            return Math.max(...ids)
        } catch (e) {
            throw new Error(e)
        }
    }

    async createUser(nombre, apellido, nombreUsuario, password) {
        try {
            if (nombre, apellido, nombreUsuario, password) {
                let id = await this.getMaxId()
                if (this.users.some(el => el.nombreUsuario === nombreUsuario)) {
                    throw new Error(`A user with the userName ${nombreUsuario} alredy exists`)
                }
                const hash = createHmac('sha256', nombreUsuario)
                hash.update(password)
                password = hash.digest('hex')
                const u = {
                    'id': id + 1,
                    'nombre': nombre,
                    'apellido': apellido,
                    'nombreUsuario': nombreUsuario,
                    'password': password
                }
                this.users.push(u)
                await fs.promises.writeFile(this.path, JSON.stringify(this.users))
                return u
            } else {
                throw new Error('All fields are required')
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    async getUserById(id) {
        await this.getUsers()
        const u = this.users.find(el => el.id === id)
        if (u) {
            return u
        }
        return null
    }

    async getUserByNickName(nick) {
        await this.getUsers()
        const u = this.users.find(el => el.nombreUsuario === nick)
        if (u) {
            return u
        }
        return null
    }

    async updateUser(id, newUser) {
        await this.getUsers()
        const u = this.users.find(el => el.id === id)
        if (u) {
            u.nombre = newUser?.nombre || u.nombre
            u.apellido = newUser?.apellido || u.apellido
            u.password = newUser?.password || u.password
            const users = this.users.map(el => el.id === id ? u : el)
            await fs.promises.writeFile(this.path, JSON.stringify(users))
            return u
        } else {
            throw new Error(`The user with id ${id} does not exist`)
        }
    }

    async deleteUser(id) {
        await this.getUsers()
        const u = this.users.find(el => el.id === id)
        if (u) {
            const users = this.users.filter(el => el.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(users))
        } else {
            throw new Error(`The user with id ${id} does not exist`)
        }
    }

    async validarUser(nombreUsuario, password) {
        const u = await this.getUserByNickName(nombreUsuario)
        if (u) {
            const hash = createHmac('sha256', nombreUsuario)
            hash.update(password)
            password = hash.digest('hex')
            if (password === u.password) {
                return "Logueado"
            } else {
                return "La contraseña no coincide"
            }
        } else {
            return "El usuario no existe"
        }
    }
}