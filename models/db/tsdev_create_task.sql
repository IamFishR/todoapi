DELIMITER //

CREATE PROCEDURE `create_task`(
    IN task_id VARCHAR(255),
    IN user_id BIGINT,
    IN title VARCHAR(255),
    IN description TEXT,
    IN status VARCHAR(255),
    IN priority VARCHAR(255),
    IN due_date DATE,
    IN created_at TIMESTAMP,
    IN updated_at TIMESTAMP,
    IN tags VARCHAR(255),
    IN assign_to VARCHAR(255),
    IN assign_by VARCHAR(255),
    IN assign_at DATE,
    IN completed_at DATE,
    IN deleted_at TIMESTAMP,
    IN attachment_id BIGINT,
    IN comment_id BIGINT
)
BEGIN
    INSERT INTO tasks (
        task_id,
        user_id,
        title,
        description,
        status,
        priority,
        due_date,
        created_at,
        updated_at,
        tags,
        assign_to,
        assign_by,
        assign_at,
        completed_at,
        deleted_at,
        attachment_id,
        comment_id
    ) VALUES (
        task_id,
        user_id,
        title,
        description,
        status,
        priority,
        due_date,
        created_at,
        updated_at,
        tags,
        assign_to,
        assign_by,
        assign_at,
        completed_at,
        deleted_at,
        attachment_id,
        comment_id
    );
END //

DELIMITER ;
