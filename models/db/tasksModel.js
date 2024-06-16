const TasksOperations = require('../dboperations/tasksOperations');

const ErrorMessages = {
    'ER_BAD_FIELD_ERROR': 'Bad field error',
    'ER_NO_SUCH_TABLE': 'No such table',
    'ER_PARSE_ERROR': 'Parse error',
    'ER_ACCESS_DENIED_ERROR': 'Access denied error',
    'ER_BAD_DB_ERROR': 'Bad database error',
    'ER_BAD_TABLE_ERROR': 'Bad table error',
    'ER_NO_SUCH_TABLE': 'No such table',
    'ER_TABLE_EXISTS_ERROR': 'Table exists error',
    'ER_DUP_ENTRY': 'Duplicate entry',
    'ER_NO_REFERENCED_ROW_2': 'Foreign key constraint fails',
    'ER_NO_DEFAULT_FOR_FIELD': 'Field doesn\'t have a default value',
    'ER_DATA_TOO_LONG': 'Data too long for column',
    'ER_TRUNCATED_WRONG_VALUE': 'Truncated wrong value',
    'ER_NO_DEFAULT_FOR_FIELD': 'Field doesn\'t have a default value',
    'ER_CANT_AGGREGATE_2COLLATIONS': 'collation mismatch',
    'ER_DUP_FIELDNAME': 'Duplicate column name',
    'ER_SP_WRONG_NO_OF_ARGS': 'arguments mismatch!'
};

const getAllTasks = async (params) => {
    try {
        const tasks = await TasksOperations.getAllTasks(params);
        if (tasks.length === 0) {
            throw new Error('No tasks found');
        }
        if (tasks.error) {
            if (ErrorMessages[tasks.error.code]) {
                throw new Error(ErrorMessages[tasks.error.code]);
            } else {
                throw new Error(tasks.error.message);
            }
        }
        return tasks;
    } catch (error) {
        return new Error(error.message);
    }
}

const getTask = async (id) => {
    try {
        const task = await TasksOperations.getTask(id);
        if (task.error) {
            if (ErrorMessages[task.error.code]) {
                throw new Error(ErrorMessages[task.error.code]);
            } else {
                throw new Error(task.error.message);
            }
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
            if (ErrorMessages[newTask.error.code]) {
                throw new Error(ErrorMessages[newTask.error.code]);
            } else {
                throw new Error(newTask.error.message);
            }
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
            if (ErrorMessages[updatedTask.error.code]) {
                throw new Error(ErrorMessages[updatedTask.error.code]);
            } else {
                throw new Error(updatedTask.error.message);
            }
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

const createSubtask = async (subtask) => {
    try {
        const newSubtask = await TasksOperations.createSubtask(subtask);
        if (newSubtask.error) {
            if (ErrorMessages[newSubtask.error.code]) {
                throw new Error(ErrorMessages[newSubtask.error.code]);
            } else {
                throw new Error(newSubtask.error.message);
            }
        }
        if (newSubtask.affectedRows === 0) {
            throw new Error('Subtask not created');
        }
        return subtask;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const getSubtask = async (id, subId) => {
    try {
        const subtask = await TasksOperations.getSubtask(id, subId);
        if (subtask.error) {
            if (ErrorMessages[subtask.error.code]) {
                throw new Error(ErrorMessages[subtask.error.code]);
            } else {
                throw new Error(subtask.error.message);
            }
        }
        if (subtask.length === 0) {
            throw new Error('Subtask not found');
        }
        return subtask;
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
    updateTaskWithParams,
    createSubtask,
    getSubtask
}