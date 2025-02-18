const dbconnection = require('../../config/db');
const Common = require('../../helper/common');
const runQuery = require('../../helper/dbQuery');

class ProjectsModel {
    constructor() {
        this.pool = dbconnection;
        this.tableName = 'projects';
        this.tbl_tasks = 'tasks';
    }

    async getProjects(id, res) {
        try {
            let sql = `SELECT * FROM ${this.tableName}`;
            if (id) {
                sql = `SELECT * FROM ${this.tableName} WHERE project_id = ?`;
            }
            return await runQuery(this.pool, sql, id ? [id] : []);
        } catch (error) {
            return error;
        }
    }

    async getProjectsWithTasks() {
        try {
            let sql = `CALL get_projects_with_tasks();`;
            return await runQuery(this.pool, sql, []);
        } catch (error) {
            return error;
        }
    }

    async createProject(data) {
        try {
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
            const result = await runQuery(this.pool, sql, _p);
            return await this.removeFields(_p);
        } catch (error) {
            return error;
        }
    }

    async updateProject(id, data) {
        try {
            let errors = {};
            if (!id) {
                errors.id = 'Project ID is required';
            }
            if (Object.keys(errors).length > 0) {
                throw { error: errors };
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
            return await runQuery(this.pool, sql, [_p, id]);
        } catch (error) {
            return error;
        }
    }

    async deleteProject(id) {
        try {
            let errors = {};
            if (!id) {
                errors.id = 'Project ID is required';
            }
            if (Object.keys(errors).length > 0) {
                throw { error: errors };
            }

            let _p = {};
            _p.deleted_at = Common.getUnixTimeStamp();
            _p.status = 'deleted';

            let sql = `UPDATE ${this.tableName} SET ? WHERE project_id = ?`;
            return await runQuery(this.pool, sql, [_p, id]);
        } catch (error) {
            return error;
        }
    }

    async removeFields(data) {
        try {
            delete data.deleted_at;
            return data;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new ProjectsModel();

