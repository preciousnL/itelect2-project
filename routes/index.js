import express from "express";
import db from "../models/index.cjs";
import verifyToken from "../middleware/verifyToken.js";
import requireRole from "../middleware/requireRole.js";

const { Task, User, Sequelize } = db;
const { Op } = Sequelize;
const router = express.Router();

const TASK_FIELDS = [

  "title", "dueDate", "userId", "completed",

];


router.get("/", (req, res) => {
    res.json({ message: "Hello from the router!" });
});

router.get("/tasks", async (req, res) => {
  const { search } = req.query;
  const where = {};

  if (search) {
    // Sequelize sends search as a VALUE, never as SQL
    where.title = { [Op.iLike]: `%${search}%` };
  }
  const tasks = await Book.findAll({ where, include: Author, order: [["id", "ASC"]],});
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

router.post("/tasks", verifyToken, async (req, res) => {
    const tasks = await Task.create(req.body, { fields: TASK_FIELDS });
    res.status(201).json(tasks);
});

router.put("/tasks/:id", verifyToken, async (req, res) => {
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) {
    return res.status(404).json({ error: "Task not found" });
    }
    await tasks.update(req.body, { fields: TASK_FIELDS });
    res.json(tasks);
});

router.delete("/tasks/:id", verifyToken, requireRole("admin"), async (req, res) => {
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) {
    return res.status(404).json({ error: "Task not found" });
    }
    await tasks.destroy();
    res.json({ message: "Deleted", tasks, deletedBy: req.user.email });
});

export default router;