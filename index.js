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


// Option 1 (advanced!)
// Create a mapping of function pointers
const actions = {
  "view all departments": viewAllDepartments,
  // "view all roles": viewAllRoles,
  // "view all employees": viewAllEmployees,
  // "add a department": addDepartment,
  // "add a role": addRole,
  // "add an employee": addEmployee,
  // "update an employee role": updateEmployeeRole,
};

pool.connect();

// Inquirer prompt
inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    },
  ])
  .then((answers) => {
    const action = answers.action;

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
    if (action === "view all employees") {
      pool.query("SELECT * from employee", function (err, {rows}) {
        console.table(rows);
      });
    } else if (action === "view all roles") {
      pool.query("SELECT * from role", function (err, {rows}) {
        console.table(rows);
      });
    } else if (action === "view all departments") {
      pool.query("SELECT * from department", function (err, {rows}) {
        console.table(rows);
      });
    } else if (action === "add a department") {
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
  });


// pool.query('SELECT * FROM employee', function (err, {rows}) {
//   console.log(rows);
// });