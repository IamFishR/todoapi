const TasksOperations = require('../dboperations/tasksOperations');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await TasksOperations.getAllTasks();
        if (tasks.length === 0) {
            throw new Error('No tasks found');
        }
        if (tasks.error) {
            throw new Error(tasks.error);
        }
        return tasks;
    } catch (error) {
        return {
            error: error.messagef
        }
    }
}

const getTask = async (id) => {
    try {
        const task = await TasksOperations.getTask(id);
        if (task.error) {
            throw new Error(task.error);
        }
        if (task.length === 0) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const createTask = async (task) => {
    try {
        const newTask = await TasksOperations.createTask(task);
        if (newTask.error) {
            throw new Error(newTask.error);
        }
        if (newTask.affectedRows === 0) {
            throw new Error('Task not created');
        }
        return task;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const updateTaskWithParams = async (id, task) => {
    try {
        const updatedTask = await TasksOperations.updateTask(id, task);
        if (updatedTask.error) {
            throw new Error(updatedTask.error);
        }
        if (updatedTask.affectedRows === 0) {
            throw new Error('Task not updated');
        }
        return task;
    } catch (error) {
        return {
            error: error.message
        }
    }

}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTaskWithParams
}