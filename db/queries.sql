DROP FUNCTION if exists getEmployees;

CREATE OR REPLACE FUNCTION getEmployees()
RETURNS TABLE (
  id INTEGER,
  first_name VARCHAR,
  last_name VARCHAR,
  role_id INTEGER,
  manager_id INTEGER
) AS $$
BEGIN
  RETURN QUERY SELECT * FROM employee;
END;
$$ LANGUAGE plpgsql;