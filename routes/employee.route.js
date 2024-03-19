module.exports = (app) => {
  const employee = require("../controllers/employee.controller");

  var router = require("express").Router();

  // Retrieve all employees
  router.get("/", employee.findAllEmployees);

  // Create a new employee
  router.post("/create-employee", employee.insertEmployee);

  // Create a new setting
  router.post("/create-setting", employee.insertEmployeeSettings);

  // Retrieve a single student with id
  router.get("/edit-employee/:id", employee.findEmployeeSettings);
  
    // Update a employee with id
    router.put('/update-employee/:id', employee.updateEmployeeSettings)

  // Delete a employee with id
  router.delete("/delete-employee/:id", employee.deleteEmployeeSettings);

  app.use("/employees", router);
};
