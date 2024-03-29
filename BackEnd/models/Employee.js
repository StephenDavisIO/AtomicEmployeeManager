// Stephen Davis
// stephendavis.io

const mongoose = require("mongoose");

let EmployeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Employee ID is required"],
    unique: [true, "Employee ID already exists"],
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  emailId: {
    type: String,
    required: [true, "Email ID is required"],
  },
});

module.exports = mongoose.model("employee", EmployeeSchema, "employee");
