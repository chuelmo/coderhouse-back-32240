class TicketManager {
    #precioBaseDeGanancia
    #id

    constructor() {
        this.eventos = []
        this.#precioBaseDeGanancia = 0.15
        this.#id = 0
    }

    getEventos = () => {
        if (this.eventos.length === 0) {
            console.log('No hay eventos registrados')
        } else {
            this.eventos.forEach(el => {
                console.log(el)
            })
        }
    }

    agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date()) => {
        this.#id += 1
        const evento = {
            'id': this.#id,
            'nombre': nombre,
            'lugar': lugar,
            'precio': precio + this.#precioBaseDeGanancia,
            'capacidad': capacidad,
            'fecha': fecha,
            'participantes': []
        }
        this.eventos.push(evento)
    }

    agregarUsuario = (idEvento, idUsuario) => {
        let posicionEvento = this.#getPosicionEvento(idEvento)
        if (posicionEvento != -1) {
            if (!this.eventos[posicionEvento].participantes.includes(idUsuario)) {
                this.eventos[posicionEvento].participantes.push(idUsuario)
                console.log(`Se agregó el usuario ${idUsuario} al evento ${idEvento}`)
            } else {
                console.log('Error: el usuario ya estaba registrado')
            }
        } else {
            console.log('Error: No existe el evento')
        }
    }

    #getPosicionEvento = (idEvento) => {
        for (let i = 0; i < this.eventos.length; i++) {
            if (this.eventos[i].id === idEvento) {
                return i
            }
        }
        return -1
    }

    ponerEventoEnGira = (idEvento, localidad, fecha) => {
        let posicionEvento = this.#getPosicionEvento(idEvento)
        if (posicionEvento != -1) {
            this.#id += 1
            let evento = {
                ...this.eventos[posicionEvento],
                lugar: localidad,
                fecha,
                id: this.#id,
                participantes: []
            }
            console.log(`Se puso el evento ${this.eventos[posicionEvento].id} en gira con el id: ${evento.id}`)
            return evento
        }
        console.log(`No existe el evento con el id ${idEvento}`)
        return null
    }
}

//Test clase TicketManager

const tm = new TicketManager()
tm.getEventos()
tm.ponerEventoEnGira(0, 'Rocha', new Date())
tm.agregarEvento('Recital Shakira', 'Estadio', 120, 170)
tm.agregarEvento('Final tenis', 'BsAs', 105, 1250, '2023-03-27')
tm.agregarUsuario(1, 1)
tm.agregarUsuario(1, 2)
tm.agregarUsuario(1, 1)
tm.agregarUsuario(2,1)
tm.getEventos()
let evento = tm.ponerEventoEnGira(3, 'Rosario', '2024-07-07')
console.log(evento)
let evento2 = tm.ponerEventoEnGira(2, 'Colonia', '2025-11-08')
console.log(evento2)