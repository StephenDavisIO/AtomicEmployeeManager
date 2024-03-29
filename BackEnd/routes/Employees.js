// Stephen Davis
// stephendavis.io

const express = require("express");
const router = express();
const Employee = require("../models/Employee");

const validateInput = (employee) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errors = [];

  if (!employee.id || !employee.firstName || !employee.lastName) {
    if (!employee.id) {
      errors.push("Employee ID is required.");
    }
    if (!employee.firstName) {
      errors.push("First name is required.");
    }
    if (!employee.lastName) {
      errors.push("Last name is required.");
    }
  }

  if (!employee.emailId) {
    errors.push("Email ID is required.");
  } else if (!regex.test(String(employee.emailId).toLowerCase())) {
    errors.push("Email address is not valid.");
  }

  return errors;
};

const validateId = (employee) => {
  if (employee.id) {
    _employee = Employee.findOne({ id: employee.id });
    if (_employee.id !== undefined) {
      return "Employee ID " + employee.id + " is already in use.";
    } else {
      return null;
    }
  }
};

router.get("/api/v1/employees", (req, res) => {
  Employee.find()
    .then((employees) => res.send(employees))
    .catch((error) => res.status(500).send({ error: error }));
});

router.post("/api/v1/employees", (req, res) => {
  const _employee = new Employee(req.body);
  let throwsError = false;
  let errors = [];

  if (_employee.id !== null) {
    const idAvailable = validateId(_employee);
    if (idAvailable !== null) {
      throwsError = true;
      errors.push(idAvailable);
    }
  }

  const isValid = validateInput(_employee);
  if (isValid.length > 0) {
    throwsError = true;
    isValid.forEach((error) => {
      errors.push(error);
    });
  }

  if (throwsError) {
    return res.status(400).send({ error: errors });
  } else {
    _employee
      .save()
      .then(() => res.status(201).send({ message: "Employee Created" }))
      .catch((error) => res.status(400).send({ error: error }));
  }
});

router.get("/api/v1/employees/:id", (req, res) => {
  const _id = req.params.id;

  Employee.findOne({ id: _id })
    .then((employee) => {
      if (employee != null) {
        res.send(employee);
      } else {
        res.status(404).send({ error: "Employee Not Found" });
      }
    })
    .catch((error) => res.status(500).send({ error: error }));
});

router.put("/api/v1/employees/:id", (req, res) => {
  const _id = req.params.id;
  const _employee = {
    id: _id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
  };
  let throwsError = false;
  let errors = [];

  const isValid = validateInput(_employee);
  if (isValid.length > 0) {
    throwsError = true;
    isValid.forEach((error) => {
      errors.push(error);
    });
  }

  if (throwsError) {
    return res.status(400).send({ error: errors });
  } else {
    Employee.updateOne({ id: _id }, _employee)
      .then((employee) => {
        if (employee != null) {
          res.send({ message: "Employee Updated" });
        } else {
          res.status(404).send({ error: "Employee Not Found" });
        }
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
});

router.delete("/api/v1/employees/:id", (req, res) => {
  const _id = req.params.id;

  Employee.deleteOne({ id: _id })
    .then(() => res.send({ message: "Employee Has Been Deleted" }))
    .catch((error) => res.status(500).send({ error: error }));
});

module.exports = router;
