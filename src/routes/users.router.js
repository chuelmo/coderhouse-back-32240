import { Router } from "express";
import Users from "../dao/dbManagers/users.js";

const router = Router();
const usersManager = new Users();

router.get('/', async (req, res) => {
    let users = await usersManager.getAll();
    if (!users) return res.status(500).send({ status: "error", error: "No pude traer informacion" });
    res.send({status: "success", payload: users})
});

router.post('/', async (req, res) => {
    const { first_name, last_name, email, dni, birthDate, gender } = req.body;
    let newUser = {
        first_name,
        last_name,
        email,
        dni,
        birthDate,
        gender
    }
    const result = await usersManager.saveUser(newUser);
    res.send({status: "success", payload: result});
});

export default router;