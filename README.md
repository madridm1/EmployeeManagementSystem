# MySQL: Employee Tracker

This app is a **C**ontent **M**anagement **S**ystems solution for managing a company's employees using node, inquirer, and MySQL.

## Design

![Database Schema](Assets/schema.png)

- **department**:

  - **department_id** - INT PRIMARY KEY
  - **name** - VARCHAR(30) to hold department name

- **role**:

  - **role_id** - INT PRIMARY KEY
  - **title** - VARCHAR(30) to hold role title
  - **salary** - DECIMAL to hold role salary
  - **department_id** - INT to hold reference to department role belongs to

- **employee**:

  - **ee_id** - INT PRIMARY KEY
  - **first_name** - VARCHAR(30) to hold employee first name
  - **last_name** - VARCHAR(30) to hold employee last name
  - **role_id** - INT to hold reference to role employee has
  - **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

Command-line application that allows the user to:

- Add departments, roles, employees

- View departments, roles, employees

- Update employee roles

- View the total utilized budget of a department

Framed as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Technology:

- Used the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to MySQL database and perform queries.

- Used [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

- Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

- Input validation using [Regular Expression](http://www.regexbuddy.com/regex.html) aka Regex or Regexp

![Demonstration](Assets/EMSdemonstration.gif)
