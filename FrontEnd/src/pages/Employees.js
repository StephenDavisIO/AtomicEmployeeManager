// Stephen Davis
// stephendavis.io

import React, { Component } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import * as CONSTANTS from "../Constants";

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: null,
      error: false,
      loading: true,
    };
  }

  getEmployees() {
    axios
      .get(CONSTANTS.API_URL)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          this.setState({
            employees: data,
            loading: false,
          });
        } else {
          this.setState({
            employees: 0,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    const { employees, error, loading } = this.state;

    if (error) {
      return (
        <div className="App">
          <div className="AppBody">
            <h1>An Error Occured Loading Employees</h1>
            <h2>Please Try Again Later or Contact Support.</h2>
            <Spinner animation="border" />
          </div>
        </div>
      );
    }

    if (employees === 0) {
      return (
        <div className="App">
          <div className="AppBody">
            <h1>No Employees Found</h1>
            <h2>There are no employees recorded in the database.</h2>
            <Button
              variant="outline-success"
              href={CONSTANTS.ROUTES.CREATE_EMPLOYEE}
            >
              Create New Employee
            </Button>
          </div>
        </div>
      );
    }

    if (employees !== null && !loading) {
      return (
        <div className="App">
          <div className="AppBody">
            <h1>Employees List</h1>
            <h5 className="mb-4">
              Click on an employee row to view, update or delete.
            </h5>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.emailId}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        href={CONSTANTS.ROUTES.VIEW_EMPLOYEE + employee.id}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="AppBody">
          <h1>Loading Employees Table</h1>
          <Spinner animation="border" />
        </div>
      </div>
    );
  }
}
