-- tsdev_save_response PROCEDURE
-- this procedure will get only one param, json string
-- this json string will have the following keys
-- {
    -- response: JSON.stringify(answer),
    -- user_id: req.user.id,
    -- type: 'hdfcBankSms',
    -- status: 'one_time_chat',
    -- created_at: Common.getTodaysDateWithTime(),
    -- updated_at: Common.getTodaysDateWithTime(),
    -- deleted_at: null,
-- }

DELIMITER $$

DROP PROCEDURE IF EXISTS `tsdev_save_response`$$
CREATE PROCEDURE `tsdev_save_response`(
    IN json_string JSON
)

BEGIN
    INSERT INTO responses(
        response,
        user_id,
        type,
        status,
        created_at,
        updated_at,
        deleted_at
    )
    VALUES(
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.response')),
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.user_id')),
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.type')),
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.status')),
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.created_at')),
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.updated_at')),
        JSON_UNQUOTE(JSON_EXTRACT(json_string, '$.deleted_at'))
    );

END$$