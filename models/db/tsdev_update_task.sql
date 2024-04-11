DELIMITER //
DROP PROCEDURE IF EXISTS `tsdev_update_task` //
CREATE PROCEDURE `tsdev_update_task`(
    IN in_task_id VARCHAR(255),
    IN in_title VARCHAR(255),
    IN in_description VARCHAR(255),
    IN in_status VARCHAR(255),
    IN in_priority VARCHAR(255),
    IN in_due_date DATE,
    IN in_updated_at TIMESTAMP,
    IN in_tags VARCHAR(255),
    IN in_assign_to VARCHAR(255),
    IN in_assign_by VARCHAR(255),
    IN in_assign_at DATE,
    IN in_completed_at DATE,
    IN in_deleted_at TIMESTAMP,
    IN in_attachment_id BIGINT,
    IN in_comment_id BIGINT
)
BEGIN
    UPDATE tasks
    
    SET
        title = CASE WHEN in_title IS NOT NULL THEN in_title ELSE title END,
        description = CASE WHEN in_description IS NOT NULL THEN in_description ELSE description END,
        status = CASE WHEN in_status IS NOT NULL THEN in_status ELSE status END,
        priority = CASE WHEN in_priority IS NOT NULL THEN in_priority ELSE priority END,
        due_date = CASE WHEN in_due_date IS NOT NULL THEN in_due_date ELSE due_date END,
        updated_at = CASE WHEN in_updated_at IS NOT NULL THEN in_updated_at ELSE updated_at END,
        tags = CASE WHEN in_tags IS NOT NULL THEN in_tags ELSE tags END,
        assign_to = CASE WHEN in_assign_to IS NOT NULL THEN in_assign_to ELSE assign_to END,
        assign_by = CASE WHEN in_assign_by IS NOT NULL THEN in_assign_by ELSE assign_by END,
        assign_at = CASE WHEN in_assign_at IS NOT NULL THEN in_assign_at ELSE assign_at END,
        completed_at = CASE WHEN in_completed_at IS NOT NULL THEN in_completed_at ELSE completed_at END,
        deleted_at = CASE WHEN in_deleted_at IS NOT NULL THEN in_deleted_at ELSE deleted_at END,
        attachment_id = CASE WHEN in_attachment_id IS NOT NULL THEN in_attachment_id ELSE attachment_id END,
        comment_id = CASE WHEN in_comment_id IS NOT NULL THEN in_comment_id ELSE comment_id END

    WHERE task_id=in_task_id;

    SELECT
        CASE WHEN in_title IS NOT NULL THEN 'title updated' ELSE '' END AS updatedTitle,
        CASE WHEN in_description IS NOT NULL THEN 'description updated' ELSE '' END AS updatedDescription,
        CASE WHEN in_status IS NOT NULL THEN 'status updated' ELSE '' END AS updatedStatus,
        CASE WHEN in_priority IS NOT NULL THEN 'priority updated' ELSE '' END AS updatedPriority,
        CASE WHEN in_due_date IS NOT NULL THEN 'due_date updated' ELSE '' END AS updatedDueDate,
        CASE WHEN in_updated_at IS NOT NULL THEN 'updated_at updated' ELSE '' END AS updatedUpdatedAt,
        CASE WHEN in_tags IS NOT NULL THEN 'tags updated' ELSE '' END AS updatedTags,
        CASE WHEN in_assign_to IS NOT NULL THEN 'assign_to updated' ELSE '' END AS updatedAssignTo,
        CASE WHEN in_assign_by IS NOT NULL THEN 'assign_by updated' ELSE '' END AS updatedAssignBy,
        CASE WHEN in_assign_at IS NOT NULL THEN 'assign_at updated' ELSE '' END AS updatedAssignAt,
        CASE WHEN in_completed_at IS NOT NULL THEN 'completed_at updated' ELSE '' END AS updatedCompletedAt,
        CASE WHEN in_deleted_at IS NOT NULL THEN 'deleted_at updated' ELSE '' END AS updatedDeletedAt,
        CASE WHEN in_attachment_id IS NOT NULL THEN 'attachment_id updated' ELSE '' END AS updatedAttachmentId,
        CASE WHEN in_comment_id IS NOT NULL THEN 'comment_id updated' ELSE '' END AS updatedCommentId
    FROM tasks
    WHERE task_id = in_task_id;

END //

DELIMITER ;