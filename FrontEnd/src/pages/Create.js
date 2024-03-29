// Stephen Davis
// stephendavis.io

import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Container,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import * as CONSTANTS from "../Constants";

function Create() {
  const [newEmployeePrompt, setNewEmployeePrompt] = useState(false);
  const [errorPrompt, setErrorPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const showEmployeePrompt = () => {
    setNewEmployeePrompt(true);
  };
  const showErrorPrompt = () => {
    setErrorPrompt(true);
  };
  const hideErrorPrompt = () => {
    setErrorPrompt(false);
  };
  const getErrorList = () => {
    let errorList = [];
    errorMessage.forEach((element) => {
      errorList.push(
        <Alert key={element} variant="danger">
          {element}
        </Alert>
      );
    });
    return errorList;
  };

  function createEmployee(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const _employee = {
      id: formData.get("employeeId"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      emailId: formData.get("emailId"),
    };

    axios
      .post(CONSTANTS.API_URL, _employee)
      .then((response) => {
        showEmployeePrompt();
        setTimeout(() => {
          window.location.href = CONSTANTS.ROUTES.VIEW_EMPLOYEE + _employee.id;
        }, 3000);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.error);
          showErrorPrompt();
        }
      });
  }

  return (
    <div className="App">
      <div className="AppBody">
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col lg="8">
              <h1>Create New Employee Record</h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col lg="8">
              <Form onSubmit={createEmployee}>
                <Form.Group as={Row} className="mb-4">
                  <Form.Label
                    column
                    sm="3"
                    className="text-center"
                    htmlFor="employeeId"
                  >
                    Employee ID
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="81327"
                      name="employeeId"
                      id="employeeId"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                  <Form.Label
                    column
                    sm="3"
                    className="text-center"
                    htmlFor="firstName"
                  >
                    First Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Sarah"
                      name="firstName"
                      id="firstName"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                  <Form.Label
                    column
                    sm="3"
                    className="text-center"
                    htmlFor="lastName"
                  >
                    Last Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Williams"
                      name="lastName"
                      id="lastName"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                  <Form.Label
                    column
                    sm="3"
                    className="text-center"
                    htmlFor="emailId"
                  >
                    Email Address
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="sarah.williams@company.xyz"
                      name="emailId"
                      id="emailId"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                  <Col>
                    <Button
                      className="float-start"
                      variant="outline-warning"
                      type="clear"
                    >
                      Clear Form
                    </Button>
                    <Button
                      className="float-end"
                      variant="success"
                      type="submit"
                    >
                      Create Employee
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>

        <Modal show={newEmployeePrompt} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Employee Created</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <strong>
              You will be redirected to the employee details page.
            </strong>
          </Modal.Body>
        </Modal>

        <Modal
          show={errorPrompt}
          onHide={hideErrorPrompt}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Error Creating Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">{getErrorList()}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={hideErrorPrompt}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Create;
