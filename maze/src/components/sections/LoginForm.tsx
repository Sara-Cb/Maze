import { useRef, useState, FormEvent, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loginFetch } from "../../redux/actions/loginAction";
import { store, RootState, resetStoreAction } from "../../redux/store/store";

const LoginForm = () => {
  const dispatch = store.dispatch;
  const login = useSelector((state: RootState) => state.login);
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const loadData = async () => {
    await dispatch(loginFetch(formValues.username, formValues.password));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadData();
  };

  useEffect(() => {
    dispatch(resetStoreAction);
    if (formRef.current) {
      formRef.current.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="authForm" id="loginForm">
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />
      </Form.Group>
      {login.error && <p className="text-danger text-center">{login.error}</p>}
      <div className="d-grid gap-2">
        <Button className="btnGreen w-25 ms-auto mx-0" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
