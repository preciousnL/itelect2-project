import express from "express";
import { tasks } from "../src/utils.js";
import { fetchSampleUsers } from "../src/api.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from the router!" });
});

router.get("/tasks", (req, res) => {
    res.status(200).json({ tasks });
});

router.get("/tasks/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.query.sort);

    for (let i = 0; i < tasks.length; i++){
        if (req.params.id === tasks[i].id.toString()){
            res.status(200).json({ tasks: tasks[i] });
            return;
        }
    }

    res.status(404).json({ message: "Task not found." });
});

const users = await fetchSampleUsers();

router.get("/users", (req, res) => {
    res.status(200).json({ users });
});

export default router;