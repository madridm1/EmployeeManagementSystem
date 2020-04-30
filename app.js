const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.db_pass,
  database: "ee_db"
});
const choices = []
function chooseRole() {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    for(const {role_id, title} of res) {
      choices.push(role_id)
    }
  });}


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
  chooseRole();
});

const updateDepartment = () => {
    console.log('update department!')
    start();
  }
  const updateRole = () => {
    inquirer.prompt([{
      name: 'whatRole',
      type: 'list',
      message: 'What role would you like to update?',
      choices: choices
    },
    {
     name: 'titleU',
     type: 'input',
     message: "What is the new title?"
    },
    {
      name: 'salaryU',
      type: 'input',
      message: "What is the new salary?",
      validate: validateNr
    },
    {
      name: 'departmentU',
      type: 'input',
      message: "What is the new department?",
      validate: validateNr
    }
    ])
    .then((answer => {
      const query = connection.query(
        "UPDATE role SET ? WHERE ?", 
      [
      {
        title: answer.titleU,
        salary: answer.salaryU,
        department_id: answer.departmentU
      },
      {
        role_id: answer.whatRole
      }
      ],
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} rows updated \n`)
      }
      )
    }))
  }
  
  const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      for(const {department_id, name} of res) {
        console.log(`Deparment id: ${department_id} | Department name: ${name}`);
      }
      start();
    });
  }
  const viewRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      for(const {title, salary, department_id} of res) {
        console.log(`Title is: ${title} | Salary is ${salary} | Department number is ${department_id}`)
      }
      start();
    })
  }
  const viewEmployee = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      for(const {first_name, last_name, role_id, manager_id} of res) {
        console.log(`I am ${first_name} ${last_name} my role number is ${role_id} and my manager id is ${manager_id}`)
      }
      start();
    })
  }
  
  const addNewDepartment = () => {
    inquirer.prompt({
      name: 'departmentName',
      type: 'input',
      message: 'Please enter department name'
    }).then(function(answer) {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.departmentName
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' department added\n')
          start();
        } 
      )
    })
  }
  const addNewRole = () => {
    inquirer.prompt([{
      name: 'roleName',
      type: 'input',
      message: 'Please enter role title'
    },
    {
      name: 'roleSalary',
      type: 'input',
      message: 'Please enter role salary',
      validate: validateNr
    },
    {
      name: 'roleDepartment',
      type: 'input',
      message: 'Please enter department number for this role',
      validate: validateNr
    }]
    ).then(function(answer) {
      const query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.roleName,
          salary: answer.roleSalary,
          department_id: answer.roleDepartment
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' role added\n')
          start();
        } 
      )
    })
  }
  const addNewEmployee = () => {
    inquirer.prompt([{
      name: 'employeeFirstName',
      type: 'input',
      message: 'Please enter employee first name'
    },
    {
      name: 'employeeLastName',
      type: 'input',
      message: 'Please enter employee last name'
    },
    {
      name: 'employeeRole',
      type: 'input',
      message: 'Please enter role number for this employee',
      validate: validateNr
    },
    {
      name: 'employeeManager',
      type: 'input',
      message: 'Please enter manager id number for this employee',
      validate: validateNr
    }]
    ).then(function(answer) {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employeeFirstName,
          last_name: answer.employeeLastName,
          role_id: answer.employeeRole,
          manager_id: answer.employeeManager
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' employee added\n')
          start();
        } 
      )
    })
  }
  function exit() {
      connection.end();
    }

  function addWhat() {
    // console.log('what')
      inquirer.prompt({
        name: 'addWhat',
        type: 'list',
        message: 'What would you like to add?',
        choices: ['Department', 'Role', 'Employee'],
      }).then(function(answer) {
          switch (answer.addWhat) {
            case 'Department':
                addNewDepartment();
                break;
            case 'Role':
                addNewRole();
                break;
            case 'Employee':
                addNewEmployee();
                break;
          }
      })
  }

  const viewWhat = () => {
      inquirer.prompt({
        name: 'viewWhat',
        type: 'list',
        message: 'What would you like to view?',
        choices: ['Department', 'Role', 'Employee']
      }).then(answer => {
          switch (answer.viewWhat) {
            case 'Department':
                    viewDepartment();
                    break;
                case 'Role':
                    viewRole();
                    break;
                case 'Employee':
                    viewEmployee();
                    break; 
          }
      })
  }

  const updateWhat = () => {
    inquirer.prompt({
      name: 'updateWhat',
      type: 'list',
      message: 'What would you like to update?',
      choices: ['Role']
    }).then(answer => {
        switch (answer.updateWhat) {
          case 'Department':
                  updateDepartment();
                  break;
              case 'Role':
                  updateRole();
                  break;
              case 'Employee':
                  updateEmployee();
                  break; 
        }
    })
}

const viewTotals = () => {
  inquirer.prompt({
    name: "departmentT",
    type: 'list',
    message: 'What department totals would you like to see?',
    choices: choices
  }).then((answer => {
    const query = connection.query(
    "SELECT SUM(salary) departmentTotal FROM role WHERE ?",
    {
      department_id: answer.departmentT
    }, (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    })
  }))
}

  function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add', 'View', 'Update', 'View Department Totals', 'Exit']
        })
        .then(function(answer) {
        switch (answer.action) {
            case 'Add':
            addWhat();
            break;

            case 'View':
            viewWhat();
            break;

            case 'Update':
            updateWhat();
            break;

            case 'View Department Totals':
            viewTotals();
            break;

            case 'Exit':
            exit();
            break;
        }
    })
}

function validateNr(nr)
{
    const reg = /^\d+$/;
    return reg.test(nr) || "This should be a number!";
}