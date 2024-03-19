const db = require("../models");
const Employee = db.employee;
const Setting = db.setting;

exports.findAllEmployees = (req, res) => {
  Employee.findAll({
    include: [
      {
        model: Setting,
        attributes: ["theme"],
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred!",
      });
    });
};
exports.insertEmployee = (req, res) => {
  try {
    if (!req.body.name || !req.body.position) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
      return;
    }
    const employee = {
      name: req.body.name,
      position: req.body.position,
    };

    Employee.create(employee)
      .then((data) => {
        //console.log(data.id);

        Setting.create({
          theme: req.body.theme,
          employeeId: data.id,
        });

        res.json({ message: "Employee created." });
      })
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
exports.insertEmployeeSettings = (req, res) => {
  try {
    if (!req.body.theme || !req.body.employeeId) {
      res.status(400).send({
        message: "cannot be empty!",
      });
      return;
    }
    const employeeSetting = {
      theme: req.body.theme,
      employeeId: req.body.employeeId,
    };
    console.log(employeeSetting);
    Setting.create(employeeSetting)
      .then(res.json({ message: "settings created." }))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

exports.findEmployeeSettings = (req, res) => {
  const id = req.params.id;
  Employee.findByPk(id, {
    include: [
      {
        model: Setting,
        attributes: ["theme"],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          //message: `Error 404 ${id}`
          message: "Error 404 : id = " + id,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error 500" + id,
      });
    });
};

exports.updateEmployeeSettings = (req, res) => {
    const id = req.params.id;
    Employee.update(req.body, {where: {id:id}})
        .then(num => {
            if(num == 1){
                Setting.update(req.body, {where: {employeeId:id}});
                res.status(200).json({
                    message: "Updated successfully."
                });
            }else{
                res.status(400).json({
                    message: "Updated failed!"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error update!"
            });
        });
};

exports.deleteEmployeeSettings = (req, res) => {
    const id = req.params.id;
    Employee.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            //Setting.destroy({ where: {id:id}});
            res.send({
                message: "Deleted successfully."
            })
        }else{
            res.send({
                message: "Delete failed!"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error deleted 500"
        });
    });
};