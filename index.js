const { Pool } = require('pg');
const inquirer = require('inquirer');


// Connect to database
const pool = new Pool(
  {
    user: 'brandeecheung',
    password: '',
    host: 'localhost',
    database: 'employee_tracker_db'
  },
)

function viewAllDepartments() {
  pool.query("SELECT * from department", function (err, {rows}) {
    console.table(rows);
  });
}

function viewAllRoles() {
  pool.query(`
    SELECT a.id, a.title, a.salary, b.name as department
    from role a inner join department b on a.department_id = b.id`, function (err, {rows}) {
    console.table(rows);
  });
}

function viewAllEmployees() {
  pool.query(`
    SELECT a.id, a.first_name, a.last_name, b.title, d.name, b.salary, concat(c.first_name, ' ', c.last_name) as manager
    from employee a 
    left join role b on a.role_id = b.id 
    left join employee c on a.manager_id = c.id 
    left join department d on b.department_id = d.id
  `, function (err, {rows}) {
    console.table(rows);
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
      },
    ])
    .then((answers) => {
      const department = answers.department;
      pool.query(`INSERT INTO department (name) VALUES ('${department}')`, function (err, {rows}) {
        console.log('Department added');
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'What is the department id of the role?',
      },
    ])
    .then((answers) => {
      const title = answers.title;
      const salary = answers.salary;
      const department_id = answers.department_id;
      pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', '${department_id}')`, function (err, {rows}) {
        console.log('Role added');
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the employee?',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name of the employee?',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'What is the role id of the employee?',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'What is the manager id of the employee?',
      },
    ])
    .then((answers) => {
      const first_name = answers.first_name;
      const last_name = answers.last_name;
      const role_id = answers.role_id;
      const manager_id = answers.manager_id;
      pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`, function (err, {rows}) {
        console.log('Employee added');
      });
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'What is the id of the employee?',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'What is the new role id of the employee?',
      },
    ])
    .then((answers) => {
      const employee_id = answers.employee_id;
      const role_id = answers.role_id;
      pool.query(`UPDATE employee SET role_id = '${role_id}' WHERE id = '${employee_id}'`, function (err, {rows}) {
        console.log('Employee role updated');
      });
    });
}


// Option 1 (advanced!)
// Create a mapping of function pointers
const actions = {
  "view all departments": viewAllDepartments,
  "view all roles": viewAllRoles,
  "view all employees": viewAllEmployees,
  "add a department": addDepartment,
  "add a role": addRole,
  "add an employee": addEmployee,
  "update an employee role": updateEmployeeRole,
};

pool.connect();

// Inquirer prompt
inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: Object.keys(actions),
    },
  ])
  .then((answers) => {
    const action = answers.action;
    actions[action]();
  });



    // Option 2 (pretty clean!)
    // switch (action) {
    //   case "view all departments":
    //     viewAllDepartments();
    //     break;
    //   case "view all roles":
    //     pool.query("SELECT * from role", function (err, {rows}) {
    //       console.table(rows);
    //     });
    //     break;
    // }

    // Also option 1
    // actions[action]();

    // Option 3 (old school)
    // if (action === "view all employees") {
    //   pool.query("SELECT * from employee", function (err, {rows}) {
    //     console.table(rows);
    //   });
    // } else if (action === "view all roles") {
    //   pool.query("SELECT * from role", function (err, {rows}) {
    //     console.table(rows);
    //   });
    // } else if (action === "view all departments") {
    //   pool.query("SELECT * from department", function (err, {rows}) {
    //     console.table(rows);
    //   });
    // } else if (action === "add a department") {
    //   inquirer
    //     .prompt([
    //       {
    //         type: 'input',
    //         name: 'department',
    //         message: 'What is the name of the department?',
    //       },
    //     ])
    //     .then((answers) => {
    //       const department = answers.department;
    //       pool.query(`INSERT INTO department (name) VALUES ('${department}')`, function (err, {rows}) {
    //         console.log('Department added');
    //       });
    //     });
    // }


// pool.query('SELECT * FROM employee', function (err, {rows}) {
//   console.log(rows);
// });