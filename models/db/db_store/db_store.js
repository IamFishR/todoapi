/**
 * this file is used to store db structure
 */

const dbconnection = require('../../../config/db');

class DB_STORE {
    constructor() {
        this.pool = dbconnection;
    } 
    // committing changes ch

    // tasks table
    createTasksTable() {
        const sql = `CREATE TABLE IF NOT EXISTS tasks (
            task_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            attachment_id VARCHAR(255),
            comment_id VARCHAR(255),
            project_id VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(255) NOT NULL DEFAULT 'todo',
            priority VARCHAR(255) NOT NULL DEFAULT 'medium',
            due_date DATE,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            tags VARCHAR(255),
            assign_to VARCHAR(255),
            assign_by VARCHAR(255),
            assign_at DATETIME,
            completed_at DATETIME,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    createSubTasksTable() {
        const sql = `CREATE TABLE IF NOT EXISTS sub_tasks (
            sub_task_id VARCHAR(255) PRIMARY KEY,
            task_id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            attachment_id VARCHAR(255),
            comment_id VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(255) NOT NULL DEFAULT 'todo',
            priority VARCHAR(255) NOT NULL DEFAULT 'medium',
            due_date DATE,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            tags VARCHAR(255),
            assign_to VARCHAR(255),
            assign_by VARCHAR(255),
            assign_at DATETIME,
            completed_at DATETIME,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    createProjectsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS projects (
            project_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task_id VARCHAR(255),
            comment_id VARCHAR(255),
            name VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(255) NOT NULL DEFAULT 'todo',
            color VARCHAR(255),
            priority VARCHAR(255) NOT NULL DEFAULT 'medium',
            due_date DATE,
            start_date DATE,
            attachment_id VARCHAR(255),
            owner VARCHAR(255),
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    createUsersTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            user_id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL DEFAULT 'user',
            avatar VARCHAR(255) NOT NULL DEFAULT 'default.png',
            bio VARCHAR(255),
            facebook VARCHAR(255),
            twitter VARCHAR(255),
            linkedin VARCHAR(255),
            github VARCHAR(255),
            website VARCHAR(255),
            google VARCHAR(255),
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // oauth_access_tokens table
    createOauthAccessTokensTable() {
        const sql = `CREATE TABLE IF NOT EXISTS oauth_access_tokens (
            access_token VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            client_id VARCHAR(255) NOT NULL,
            expires TIMESTAMP NOT NULL,
            scope VARCHAR(255)
        )`;
        return this.pool.query(sql);
    }

    // oauth_clients table
    createOauthClientsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS oauth_clients (
            client_id VARCHAR(255) PRIMARY KEY,
            client_secret VARCHAR(255) NOT NULL,
            redirect_uri VARCHAR(255) NOT NULL,
            personal_access_client BOOLEAN NOT NULL DEFAULT false,
            password_client BOOLEAN NOT NULL DEFAULT false,
            revoked BOOLEAN NOT NULL DEFAULT false,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // oauth_refresh_tokens table
    createOauthRefreshTokensTable() {
        const sql = `CREATE TABLE IF NOT EXISTS oauth_refresh_tokens (
            refresh_token VARCHAR(255) PRIMARY KEY,
            access_token VARCHAR(255) NOT NULL,
            expires TIMESTAMP NOT NULL,
            scope VARCHAR(255)
        )`;
        return this.pool.query(sql);
    }

    // oauth_scopes table
    createOauthScopesTable() {
        const sql = `CREATE TABLE IF NOT EXISTS oauth_scopes (
            scope VARCHAR(255) PRIMARY KEY,
            is_default BOOLEAN
        )`;
        return this.pool.query(sql);
    }

    // sessions table
    createSessionsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS sessions (
            session_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            expires TIMESTAMP NOT NULL
        )`;
        return this.pool.query(sql);
    }

    // attachments table
    createAttachmentsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS attachments (
            attachment_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task_id VARCHAR(255),
            sub_task_id VARCHAR(255),
            project_id VARCHAR(255),
            comment_id VARCHAR(255),
            name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // comments table
    createCommentsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS comments (
            comment_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task_id VARCHAR(255),
            sub_task_id VARCHAR(255),
            project_id VARCHAR(255),
            comment TEXT NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // tags table
    createTagsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS tags (
            tag_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // notifications table
    createNotificationsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS notifications (
            notification_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task_id VARCHAR(255),
            sub_task_id VARCHAR(255),
            project_id VARCHAR(255),
            message TEXT NOT NULL,
            is_read BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // activities table
    createActivitiesTable() {
        const sql = `CREATE TABLE IF NOT EXISTS activities (
            activity_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task_id VARCHAR(255),
            sub_task_id VARCHAR(255),
            project_id VARCHAR(255),
            message TEXT NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    createSettingsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS settings (
            setting_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            settings JSON NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    createLogsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS logs (
            log_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task_id VARCHAR(255),
            sub_task_id VARCHAR(255),
            project_id VARCHAR(255),
            message TEXT NOT NULL,
            created_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // stock symbols table
    createStockSymbolsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS stock_symbols (
            symbol_id VARCHAR(255) PRIMARY KEY,
            symbol VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            exchange VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // create a stock analysis table which have all the above fields
    createStockAnalysisTable() {
        const sql = `CREATE TABLE IF NOT EXISTS stock_analysis (
            analysis_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            symbol_id VARCHAR(255) NOT NULL,
            earnings_growth JSON,
            revenue_growth JSON,
            profit_margins JSON,
            roe JSON,
            debt_levels JSON,
            pe_ratio JSON,
            ps_ratio JSON,
            pb_ratio JSON,
            dividend_yield JSON,
            price_trends JSON,
            volume_trends JSON,
            support_resistance JSON,
            moving_averages JSON,
            market_share JSON,
            competitive_moat JSON,
            management JSON,
            corporate_governance JSON,
            industry_trends JSON,
            economic_indicators JSON,
            risk_factors JSON,
            recent_news JSON,
            analyst_ratings JSON,
            cash_flow JSON,
            liquidity_ratios JSON,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    // news table
    createNewsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS news (
            news_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            url VARCHAR(255) NOT NULL,
            image VARCHAR(255),
            published_at TIMESTAMP,
            created_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

    createCopyPasteTable() {
        const sql = `CREATE TABLE IF NOT EXISTS copy_paste (
            copy_paste_id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP
        )`;
        return this.pool.query(sql);
    }

}
