import express from "express";
import db from "../models/index.cjs";

const { Task, User } = db;
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from the router!" });
});

router.get("/tasks", async (req, res) => {
    const tasks = await Task.findAll({ include: User, order: [["id", "ASC"]] });
    res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
    const tasks = await Task.findByPk(req.params.id, { include: User });
    if (!tasks) {
    return res.status(404).json({ error: "tasks not found" });
    }
    res.json(tasks);
});

router.get("/users", async (req, res) => {
    const users = await User.findAll({ include: Task, order: [["id", "ASC"]] });
    res.json(users);
});

router.post("/tasks", async (req, res) => {
    const tasks = await Task.create(req.body);
    res.status(201).json(tasks);
});

router.put("/tasks/:id", async (req, res) => {
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) {
    return res.status(404).json({ error: "Task not found" });
    }
    await tasks.update(req.body);
    res.json(tasks);
});

router.delete("/tasks/:id", async (req, res) => {
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) {
    return res.status(404).json({ error: "Task not found" });
    }
    await tasks.destroy();
    res.json({ message: "Deleted", tasks });
});

export default router;