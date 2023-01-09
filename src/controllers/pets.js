import * as Utils from "../utils/utils.js"

const pets = []

const getAll = (req, res) => {
    res.send({"pets": pets})
}

const add = (req, res) => {
    if (!req.body.name || !req.body.raze) {
        res.status(400).send({"error": true, "message": "Bad request"})
    } else {
        let id = Utils.getMaxId(pets) + 1
        const pet = {
            "id": id,
            "name": req.body.name,
            "raze": req.body.raze
        }
        pets.push(pet)
        res.send({"status": "ok", "message": "Pet added"})
    }
}

export { getAll, add }

