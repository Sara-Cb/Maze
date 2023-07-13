import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import loginFetch from "../../actions/loginAction";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginFetch(username, password));
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <div className="text-danger">{error}</div>}

        <Button
          variant="primary"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
