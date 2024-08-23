const dbconnection = require('../../config/db');
const Common = require('../../helper/common');

class ProjectsModel {
    constructor() {
        this.pool = dbconnection;
        this.tableName = 'projects';
        this.tbl_tasks = 'tasks';
    }

    async getProjects(id, res) {
        try {
            return new Promise((resolve, reject) => {
                let sql = `SELECT * FROM ${this.tableName}`;

                if (id) {
                    sql = `SELECT * FROM ${this.tableName} WHERE project_id = '${id}'`;
                }
                this.pool.query(sql, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getProjectsWithTasks() {
        try {
            return new Promise((resolve, reject) => {
                let sql = `CALL get_projects_with_tasks();`;
                this.pool.query(sql, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async createProject(data) {
        try {
            return new Promise((resolve, reject) => {
                const createdAt = data?.created_at ? Common.convertTimeToGMT(data.created_at) : Common.convertTimeToGMT();
                let _p = {
                    project_id: data.project_id,
                    name: data.name,
                    description: data.description ? data.description : '',
                    status: data.status,
                    tags: data.tags ? data.tags : null,
                    color: Common.getRandomColor(),
                    priority: data.priority,
                    due_date: data?.due_date ? Common.convertTimeToGMT(data.due_date) : null,
                    start_date: Common.convertTimeToGMT(data.start_date),
                    owner: data.user_id,
                    created_at: createdAt,
                    updated_at: Common.convertTimeToGMT(),
                    deleted_at: data?.deleted_at ? Common.convertTimeToGMT(data.deleted_at) : null
                };

                let sql = `INSERT INTO ${this.tableName} SET ?`;
                this.pool.query(sql, _p, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    this.removeFields(_p).then((data) => {
                        resolve(data);
                    });

                });
            });
        } catch (error) {
            return error;
        }
    }

    async updateProject(id, data) {
        try {
            return new Promise((resolve, reject) => {
                let errors = {};
                if (!id) {
                    errors.id = 'Project ID is required';
                }
                if (Object.keys(errors).length > 0) {
                    reject({
                        error: errors
                    });
                }

                let _p = {};

                if (data.name) {
                    _p.name = data.name;
                }
                if (data.description) {
                    _p.description = data.description;
                }
                if (data.status) {
                    _p.status = data.status;
                }
                if (data.priority) {
                    _p.priority = data.priority;
                }
                if (data.due_date) {
                    _p.due_date = data.due_date;
                }
                if (data.start_date) {
                    _p.start_date = data.start_date;
                }
                if (data.attachment_id) {
                    _p.attachment_id = data.attachment_id;
                }
                if (data.updated_at) {
                    _p.updated_at = data.updated_at;
                }

                let sql = `UPDATE ${this.tableName} SET ? WHERE project_id = ?`;
                this.pool.query(sql, [_p, id], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(_p);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async deleteProject(id) {
        try {
            return new Promise((resolve, reject) => {
                let errors = {};
                if (!id) {
                    errors.id = 'Project ID is required';
                }
                if (Object.keys(errors).length > 0) {
                    reject({
                        error: errors
                    });
                }

                // only change the deleted_at and status to deleted
                let _p = {};
                _p.deleted_at = Common.getUnixTimeStamp();
                _p.status = 'deleted';

                let sql = `UPDATE ${this.tableName} SET ? WHERE project_id = ?`;
                this.pool.query(sql, [_p, id], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async removeFields(data) {
        try {
            // remove the deleted_at
            delete data.deleted_at;

            return data;

        } catch (error) {
            return error;
        }
    }
}

module.exports = new ProjectsModel();

