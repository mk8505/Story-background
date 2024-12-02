const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let taskId = 1;


app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    const newTask = {
        id: taskId++,
        title,
        description,
        status: "pending",
    };

    tasks.push(newTask);

    return res.status(201).json({
        message: "Task created successfully",
        task: newTask,
    });
});

// Get All Tasks
app.get("/tasks", (req, res) => {
    return res.status(200).json(tasks);
});

// Update Task Status 
app.put("/tasks/:id", (req, res) => {
    const taskIdToUpdate = parseInt(req.params.id);
    const { status } = req.body;

    if (!status || (status !== "pending" && status !== "completed")) {
        return res.status(400).json({ error: "Status must be 'pending' or 'completed'" });
    }

    const task = tasks.find((task) => task.id === taskIdToUpdate);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.status = status;

    return res.status(200).json({
        message: "Task updated successfully",
        task,
    });
});

// Delete Task 
app.delete("/tasks/:id", (req, res) => {
    const taskIdToDelete = parseInt(req.params.id);
    console.log(tasks)
    const taskIndex = tasks.findIndex((task) => task.id === taskIdToDelete);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    return res.status(200).json({ message: "Task deleted successfully" });
});

// Filter Tasks by Status
app.get("/tasks/status/:status", (req, res) => {
    const { status } = req.params;
    const filteredTasks = tasks.filter((task) => task.status === status);

    return res.status(200).json(filteredTasks);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
