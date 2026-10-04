import db from "../models/index.cjs";

const { Task, User, Sequelize } = db;
const { Op } = Sequelize;

const TASK_FIELDS = [
    "title", "dueDate", "userId", "completed",
];

// GET /api/tasks and GET /api/tasks?search=noli
export async function listTasks(req, res) {
    const { search } = req.query;
    const where = {};
    if (search) {
        // Sequelize sends search as a VALUE, never as SQL
        where.title = { [Op.iLike]: `%${search}%` };
    }
    const tasks = await Task.findAll({
        where,
        include: User,
        order: [["id", "ASC"]],
    });
    res.json(tasks);
}

// GET /api/tasks/:id
export async function getTask(req, res) {
    const tasks = await Task.findByPk(req.params.id, {
        include: User,
    });
    if (!tasks) {
        return res.status(404).json({ error: "tasks not found" });
    }
    res.json(tasks);
}

// POST /api/tasks
export async function createTask(req, res) {
    const tasks = await Task.create(req.body, {
        fields: TASK_FIELDS,
    });
    res.status(201).json(tasks);
}

// PUT /api/tasks/:id
export async function updateTask(req, res) {
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) {
        return res.status(404).json({ error: "Task not found" });
    }
    await tasks.update(req.body, { fields: TASK_FIELDS });
    res.json(tasks);
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res) {
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) {
        return res.status(404).json({ error: "Task not found" });
    }
    await tasks.destroy();
    res.json({ message: "Deleted", tasks, deletedBy: req.user.email,});
}