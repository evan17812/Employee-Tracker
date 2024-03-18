const inquirer = require('inquirer');
const Queries = require('./queries');

const queries = new Queries();

async function startApp() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ]);

    switch (answer.action) {
      case 'View all departments':
        const departments = await queries.viewAllDepartments();
        console.table(departments);
        break;
      case 'View all roles':
        const roles = await queries.viewAllRoles();
        console.table(roles);
        break;
      case 'View all employees':
        const employees = await queries.viewAllEmployees();
        console.table(employees);
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting the application. Goodbye!');
        process.exit(0);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    startApp(); 
  }
}

async function addDepartment() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ]);

    await queries.addDepartment(answer.departmentName);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addRole() {
    try {
      const roleData = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ]);
  
      await queries.addRole(roleData);
      console.log('Role added successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function addEmployee() {
    try {
      const employeeData = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID for the employee (if applicable):',
        },
      ]);
  
      await queries.addEmployee(employeeData);
      console.log('Employee added successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function updateEmployeeRole() {
    try {
      const updateData = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the new role ID for the employee:',
        },
      ]);
  
      await queries.updateEmployeeRole(updateData.employeeId, updateData.roleId);
      console.log('Employee role updated successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  startApp();
  