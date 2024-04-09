const TasksOperations = require('../dboperations/tasksOperations');
const logme = require('../../helper/logme');


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
        logme.error(error.message);
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
        return task;
    } catch (error) {
        logme.error(error.message);
        return {
            error: error.message
        }
    }
}

module.exports = {
    getAllTasks,
    getTask
}