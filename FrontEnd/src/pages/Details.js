// Stephen Davis
// stephendavis.io

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Button,
  Image,
  Spinner,
  Col,
  Row,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import * as CONSTANTS from "../Constants";
import profile_placeholder from "../profile_placeholder.png";

function Details() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [employeeNotFound, setEmployeeNotFound] = useState(false);
  const [updatePrompt, setUpdatePrompt] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [message, setMessage] = useState(null);
  const [messagePrompt, setMessagePrompt] = useState(false);
  const [messagePromptNavigation, setMessagePromptNavigation] = useState(false);

  const showUpdatePrompt = () => {
    setUpdatePrompt(true);
  };
  const hideUpdatePrompt = () => {
    setUpdatePrompt(false);
  };
  const showDeletePrompt = () => {
    setDeletePrompt(true);
  };
  const hideDeletePrompt = () => {
    setDeletePrompt(false);
  };
  const showMessagePrompt = () => {
    setMessagePrompt(true);
  };
  const hideMessagePrompt = () => {
    setMessagePrompt(false);
  };
  const showMessagePromptNavigation = () => {
    setMessagePromptNavigation(true);
  };
  const hideMessagePromptNavigation = () => {
    setMessagePromptNavigation(false);
  };

  useEffect(() => {
    setMessage({
      title: "",
      body: "",
    });

    axios
      .get(CONSTANTS.API_URL + id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        setEmployeeNotFound(true);
      });
  }, [id]);

  function handleUpdateEmployee(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const _employee = {
      id: id,
      firstName:
        formData.get("firstName") === "" || formData.get("emailId") === null
          ? employee.firstName
          : formData.get("firstName"),
      lastName:
        formData.get("lastName") === "" || formData.get("emailId") === null
          ? employee.lastName
          : formData.get("lastName"),
      emailId:
        formData.get("emailId") === "" || formData.get("emailId") === null
          ? employee.emailId
          : formData.get("emailId"),
    };

    if (
      employee.firstName === _employee.firstName &&
      employee.lastName === _employee.lastName &&
      employee.emailId === _employee.emailId
    ) {
      setMessage({
        title: "No Changes Made",
        body: "No changes were made to the employee details.",
      });
      showMessagePromptNavigation();
      showMessagePrompt();
    } else {
      hideUpdatePrompt();
      axios
        .put(`${CONSTANTS.API_URL}${id}`, _employee)
        .then((response) => {
          setMessage({
            title: "Employee Updated",
            body: response.data.message,
          });
          showMessagePrompt();
          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        })
        .catch((error) => {
          setMessage({
            title: "An Error Occurred",
            body: error.response.data.message,
          });
          showMessagePrompt();
        });
    }
  }

  function handleDeleteEmployee() {
    hideDeletePrompt();
    axios
      .delete(`${CONSTANTS.API_URL}${id}`)
      .then((response) => {
        setMessage({
          title: "Employee Deleted",
          body: response.data.message,
          footnote: "You will be redirected to the employee list shortly.",
        });
        hideMessagePromptNavigation();
        showMessagePrompt();
        setTimeout(() => {
          window.location.href = CONSTANTS.ROUTES.EMPLOYEES;
        }, 3000);
      })
      .catch((error) => {
        setMessage({
          title: "An Error Occurred",
          body: error.response.data.message,
        });
        showMessagePrompt();
      });
  }

  if (employeeNotFound) {
    return (
      <div className="App">
        <div className="AppBody">
          <h1>Employee Not Found</h1>
          <h3>No Records could be located for Employee ID {id}</h3>
          <Button variant="primary" href="/employees">
            View Employees List
          </Button>
        </div>
      </div>
    );
  }

  if (employee !== null) {
    return (
      <div className="App">
        <div className="AppBody">
          <Container className="mt-5">
            <Row className="justify-content-md-center">
              <Col>
                <Image
                  src={profile_placeholder}
                  rounded
                  width="150"
                  height="150"
                />
              </Col>
              <Col lg="8">
                <h1>Employee Details</h1>
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
                <h5>Employee ID: {employee.id}</h5>
                <h5>Email: {employee.emailId}</h5>
              </Col>
              <Col>
                <Row className="mt-4 mb-4">
                  <Button variant="outline-warning" onClick={showUpdatePrompt}>
                    Update Employee
                  </Button>
                </Row>
                <Row className="mt-4">
                  <Button variant="outline-danger" onClick={showDeletePrompt}>
                    Delete Employee
                  </Button>
                </Row>
              </Col>
            </Row>
          </Container>

          {/* UPDATE EMPLOYEE FORM */}
          <Modal
            size="lg"
            show={updatePrompt}
            onHide={hideUpdatePrompt}
            backdrop="static"
            keyboard={false}
          >
            <Form onSubmit={handleUpdateEmployee}>
              <Modal.Header closeButton>
                <Modal.Title>Update Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                      type="text"
                      placeholder={employee.id}
                      value={employee.id}
                      name="employeeId"
                      id="employeeId"
                      disabled
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
                      placeholder={employee.firstName}
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
                      placeholder={employee.lastName}
                      name="lastName"
                      id="lastName"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
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
                      placeholder={employee.emailId}
                      name="emailId"
                      id="emailId"
                    />
                  </Col>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={hideUpdatePrompt}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Update Employee
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* DELETE EMPLOYEE PROMPT */}
          <Modal
            show={deletePrompt}
            onHide={hideDeletePrompt}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p>Are you sure you want to delete this employee?</p>
              <strong>This action cannot be undone.</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={hideDeletePrompt}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteEmployee}>
                Delete Employee
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MESSAGE PROMPT */}
          <Modal show={messagePrompt} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>{message.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <strong>{message.body}</strong>
              <br />
              <strong>{message.footnote}</strong>
            </Modal.Body>
            <Modal.Footer>
              {messagePromptNavigation ? (
                <Button variant="info" onClick={hideMessagePrompt}>
                  Close
                </Button>
              ) : (
                <Button variant="dark" disabled>
                  Close
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="AppBody">
        <h1>Loading Employee Details</h1>
        <Spinner animation="border" />
      </div>
    </div>
  );
}

export default Details;
