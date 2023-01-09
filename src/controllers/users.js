import * as Utils from "../utils/utils.js"

const users = []

const getAll = (req, res) => {
    res.send({"users": users})
}

const add = (req, res) => {
    if (!req.body.name || !req.body.nick || !req.body.email) {
        res.status(400).send({"error": true, "message": "Bad request"})
    } else {
        let id = Utils.getMaxId(users) + 1
        const user = {
            "id": id,
            "name": req.body.name,
            "nick": req.body.nick,
            "email": req.body.email
        }
        users.push(user)
        res.send({"status": "ok", "message": "User added"})
    }
}

export { getAll, add }