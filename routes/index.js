import express from "express";
import { tasks, validateTask, mergeTaskUpdate } from "../src/utils.js";
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

let nextId = 4;

router.post("/tasks", (req, res, next) => {
    if (!validateTask(req.body)) {
        const err = new Error("title and dueDate required");
        err.status = 400;
        return next(err); 
    }
    
    const task = { id: nextId++, ...req.body, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

router.put("/tasks/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((t) => t.id === id);
    
    if (index === -1) {
        const err = new Error("Task not found");
        err.status = 404;
        return next(err);
    }
    
    tasks[index] = mergeTaskUpdate(tasks[index], req.body);
    res.status(200).json(tasks[index]);
});

router.delete("/tasks/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((t) => t.id === id);
    
    if (index === -1) {
        const err = new Error("Task not found");
        err.status = 404;
        return next(err);
    }

    const [removed] = tasks.splice(index, 1);
    res.status(200).json({ message: "Deleted", task: removed });
});

export default router;