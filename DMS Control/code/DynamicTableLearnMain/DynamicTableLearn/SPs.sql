CREATE DEFINER=`Admin`@`localhost` PROCEDURE `DynamicSearchWithPagination`(
    IN p_tableName VARCHAR(255),
    IN p_keyword VARCHAR(255),
    IN p_sort VARCHAR(255),
    IN p_take INT,
    IN p_skip INT
)
BEGIN
    -- Declare variables for dynamic SQL
    DECLARE done INT DEFAULT FALSE;
    DECLARE columnName VARCHAR(255);
    DECLARE currentSchema VARCHAR(20);
    DECLARE cur CURSOR FOR
        SELECT 
			COLUMN_NAME
        FROM 
			INFORMATION_SCHEMA.COLUMNS
        WHERE 
			TABLE_NAME = p_tableName AND
            TABLE_SCHEMA = (SELECT DATABASE());
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Construct and prepare the dynamic SQL query
    SET @sql = CONCAT('SELECT * FROM ', p_tableName);

    IF p_keyword IS NOT NULL AND p_keyword != '' THEN
		SET @sql = CONCAT(@sql, ' WHERE ');
		OPEN cur;
			read_loop: LOOP
				FETCH cur INTO columnName;
				IF done THEN
					LEAVE read_loop;
				END IF;

				 SET @sql = CONCAT(@sql, columnName, ' LIKE "%', p_keyword, '%" OR ');
			END LOOP;
        CLOSE cur;
        
        -- Remove the last 'OR'
		SET @sql = LEFT(@sql, LENGTH(@sql) - 3);
	End IF;
    
    -- Apply shorting
    IF p_sort IS NOT NULL AND p_sort != '' THEN
			SET @sql = CONCAT(@sql, ' ORDER BY ', p_sort);
	END IF;
	
    -- Apply pagination
    SET @sql = CONCAT(@sql, ' LIMIT ', p_skip, ', ', p_take, ';');
    
    -- select @sql;
    -- Execute the prepared statement
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    -- prepare query for count
    SET @countSql = CONCAT('SELECT COUNT(*) AS Count FROM ', p_tableName);
    PREPARE countStmt FROM @countSql;
    EXECUTE countStmt;
    DEALLOCATE PREPARE countStmt;
END