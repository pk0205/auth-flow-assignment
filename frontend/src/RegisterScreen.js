import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "./Message";
import Loader from "./Loader";
import FormContainer from "./FormContainer";

import { register } from "./redux";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              required
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Enter password"
              value={password}
              minLength="6"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
