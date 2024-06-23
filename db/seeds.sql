-- Insert data into the "employees" table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 2, 1);

-- Insert data into the "roles" table
INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 50000, 1),
    ('Engineer', 40000, 2),
    ('Salesperson', 30000, 3);

-- Insert data into the "departments" table
INSERT INTO department (name)
VALUES ('Engineering'),
    ('Sales'),
    ('Marketing');