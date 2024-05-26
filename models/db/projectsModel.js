const dbconnection = require('../../config/db');
const logme = require('../../helper/logme');
const mysql = require('mysql');


class ProjectsModel {
    constructor() {
        this.projects = [];
        this.pool = dbconnection;
        this.tableName = 'projects';

        this.createTable();
    }

    columns = {
        project_id: 'project_id',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        color: 'color',
        status: 'status',
        priority: 'priority',
        due_date: 'due_date',
        created_at: 'created_at',
        updated_at: 'updated_at',
        tags: 'tags',
        assign_to: 'assign_to',
        assign_by: 'assign_by',
        assign_at: 'assign_at',
        deleted_at: 'deleted_at',
        completed_at: 'completed_at',
        attachment_id: 'attachment_id',
        comment_id: 'comment_id',
        task_id: 'task_id',
        start_date: 'start_date',
    }

    tableExists() {
        /**
         * Check if table exists in the database
         * 
         */
        try {
            const sql = `SHOW TABLES LIKE '${this.tableName}'`;
            this.pool.query(sql, (err, result) => {
                if (err) {
                    throw err;
                }
                // logme.info(result);
                return result.length > 0;
            });
        } catch (error) {
            logme.error({
                message: 'Error checking if project table exists',
                data: { error: error }
            });
        }
    }

    createTable() {
        /**
         * Create a table in the database if it does not exist
         * 
         */

        try {
            if (this.tableExists()) {
                return;
            }

            const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
                ${this.columns.project_id} VARCHAR(100) AUTO_INCREMENT PRIMARY KEY,
                ${this.columns.user_id} BIGINT NOT NULL,
                ${this.columns.title} VARCHAR(255) NOT NULL,
                ${this.columns.description} TEXT NOT NULL,
                ${this.columns.color} VARCHAR(255) NOT NULL,
                ${this.columns.status} VARCHAR(255) NOT NULL,
                ${this.columns.priority} VARCHAR(255) NOT NULL,
                ${this.columns.due_date} DATE NOT NULL,
                ${this.columns.created_at} TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ${this.columns.updated_at} TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                ${this.columns.tags} VARCHAR(255) NOT NULL,
                ${this.columns.assign_to} VARCHAR(255) NOT NULL,
                ${this.columns.assign_by} VARCHAR(255) NOT NULL,
                ${this.columns.assign_at} TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ${this.columns.deleted_at} TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ${this.columns.completed_at} TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ${this.columns.attachment_id} VARCHAR(255) NOT NULL,
                ${this.columns.comment_id} VARCHAR(255) NOT NULL,
                ${this.columns.task_id} VARCHAR(255) NOT NULL,
                ${this.columns.start_date} DATE NOT NULL
            )`;

            this.pool.query(sql, (err, result) => {
                if (err) {
                    throw err;
                }
                // logme.info(result);
            });
        } catch (error) {
            logme.error({
                message: 'Error creating project table',
                data: { error: error }
            });
        }
    }

    async getProjects() {
        /**
         * Get all projects from the database
         * 
         */
        try {
            const sql = `SELECT * FROM ${this.tableName}`;
            const projects = await this.pool.query(sql);
            return projects;
        } catch (error) {
            logme.error({
                message: 'Error getting projects',
                data: { error: error }
            });
        }
    }

    async getProject(id) {
        /**
         * Get a project from the database
         * 
         */
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${this.columns.project_id} = ?`;
            const project = await this.pool.query(sql, [id]);
            return project;
        } catch (error) {
            logme.error({
                message: 'Error getting project',
                data: { error: error }
            });
        }
    }

    async createProject(project) {
        /**
         * Create a project in the database
         * 
         */
        try {
            const sql = `INSERT INTO ${this.tableName} SET ?`;
            const result = await this.pool.query(sql, project);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error creating project',
                data: { error: error }
            });
        }
    }

    async updateProject(project) {
        /**
         * Update a project in the database
         * 
         */
        try {
            const sql = `UPDATE ${this.tableName} SET ? WHERE ${this.columns.project_id} = ?`;
            const result = await this.pool.query(sql, [project, project.project_id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error updating project',
                data: { error: error }
            });
        }
    }

    async deleteProject(id) {
        /**
         * Delete a project from the database
         * 
         */
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE ${this.columns.project_id} = ?`;
            const result = await this.pool.query(sql, [id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error deleting project',
                data: { error: error }
            });
        }
    }

    async getProjectComments(id) {
        /**
         * Get comments for a project from the database
         * 
         */
        try {
            const sql = `SELECT * FROM comments WHERE project_id = ?`;
            const comments = await this.pool.query(sql, [id]);
            return comments;
        } catch (error) {
            logme.error({
                message: 'Error getting project comments',
                data: { error: error }
            });
        }
    }

    async createProjectComment(comment) {
        /**
         * Create a comment for a project in the database
         * 
         */
        try {
            const sql = `INSERT INTO comments SET ?`;
            const result = await this.pool.query(sql, comment);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error creating project comment',
                data: { error: error }
            });
        }
    }

    async updateProjectComment(comment) {
        /**
         * Update a comment for a project in the database
         * 
         */
        try {
            const sql = `UPDATE comments SET ? WHERE comment_id = ?`;
            const result = await this.pool.query(sql, [comment, comment.comment_id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error updating project comment',
                data: { error: error }
            });
        }
    }

    async deleteProjectComment(id) {
        /**
         * Delete a comment for a project from the database
         * 
         */
        try {
            const sql = `DELETE FROM comments WHERE comment_id = ?`;
            const result = await this.pool.query(sql, [id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error deleting project comment',
                data: { error: error }
            });
        }
    }

    async getProjectTasks(id) {
        /**
         * Get tasks for a project from the database
         * 
         */
        try {
            const sql = `SELECT * FROM tasks WHERE project_id = ?`;
            const tasks = await this.pool.query(sql, [id]);
            return tasks;
        } catch (error) {
            logme.error({
                message: 'Error getting project tasks',
                data: { error: error }
            });
        }
    }

    async createProjectTask(task) {
        /**
         * Create a task for a project in the database
         * 
         */
        try {
            const sql = `INSERT INTO tasks SET ?`;
            const result = await this.pool.query(sql, task);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error creating project task',
                data: { error: error }
            });
        }
    }

    async updateProjectTask(task) {
        /**
         * Update a task for a project in the database
         * 
         */
        try {
            const sql = `UPDATE tasks SET ? WHERE task_id = ?`;
            const result = await this.pool.query(sql, [task, task.task_id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error updating project task',
                data: { error: error }
            });
        }
    }

    async deleteProjectTask(id) {
        /**
         * Delete a task for a project from the database
         * 
         */
        try {
            const sql = `DELETE FROM tasks WHERE task_id = ?`;
            const result = await this.pool.query(sql, [id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error deleting project task',
                data: { error: error }
            });
        }
    }

    async getProjectAttachments(id) {
        /**
         * Get attachments for a project from the database
         * 
         */
        try {
            const sql = `SELECT * FROM attachments WHERE project_id = ?`;
            const attachments = await this.pool.query(sql, [id]);
            return attachments;
        } catch (error) {
            logme.error({
                message: 'Error getting project attachments',
                data: { error: error }
            });
        }
    }

    async createProjectAttachment(attachment) {
        /**
         * Create an attachment for a project in the database
         * 
         */
        try {
            const sql = `INSERT INTO attachments SET ?`;
            const result = await this.pool.query(sql, attachment);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error creating project attachment',
                data: { error: error }
            });
        }
    }

    async updateProjectAttachment(attachment) {
        /**
         * Update an attachment for a project in the database
         * 
         */
        try {
            const sql = `UPDATE attachments SET ? WHERE attachment_id = ?`;
            const result = await this.pool.query(sql, [attachment, attachment.attachment_id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error updating project attachment',
                data: { error: error }
            });
        }
    }

    async deleteProjectAttachment(id) {
        /**
         * Delete an attachment for a project from the database
         * 
         */
        try {
            const sql = `DELETE FROM attachments WHERE attachment_id = ?`;
            const result = await this.pool.query(sql, [id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error deleting project attachment',
                data: { error: error }
            });
        }
    }

    async getProjectTags(id) {
        /**
         * Get tags for a project from the database
         * 
         */
        try {
            const sql = `SELECT * FROM tags WHERE project_id = ?`;
            const tags = await this.pool.query(sql, [id]);
            return tags;
        } catch (error) {
            logme.error({
                message: 'Error getting project tags',
                data: { error: error }
            });
        }
    }

    async createProjectTag(tag) {
        /**
         * Create a tag for a project in the database
         * 
         */
        try {
            const sql = `INSERT INTO tags SET ?`;
            const result = await this.pool.query(sql, tag);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error creating project tag',
                data: { error: error }
            });
        }
    }

    async updateProjectTag(tag) {
        /**
         * Update a tag for a project in the database
         * 
         */
        try {
            const sql = `UPDATE tags SET ? WHERE tag_id = ?`;
            const result = await this.pool.query(sql, [tag, tag.tag_id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error updating project tag',
                data: { error: error }
            });
        }
    }

    async deleteProjectTag(id) {
        /**
         * Delete a tag for a project from the database
         * 
         */
        try {
            const sql = `DELETE FROM tags WHERE tag_id = ?`;
            const result = await this.pool.query(sql, [id]);
            return result;
        } catch (error) {
            logme.error({
                message: 'Error deleting project tag',
                data: { error: error }
            });
        }
    }
}