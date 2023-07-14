import { useRef, useState, FormEvent, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCreative } from "../../redux/actions/creativeAction";
import loginFetch from "../../redux/actions/loginAction";
import { store, RootState, resetStoreAction } from "../../redux/store/store";

const LoginForm = () => {
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const login = useSelector((state: RootState) => state.login);
  const me = useSelector((state: RootState) => state.me);
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const loadData = async () => {
      await dispatch(loginFetch(formValues.username, formValues.password));
    };
    e.preventDefault();
    loadData();
  };

  useEffect(() => {
    if (me.creative?.id) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  useEffect(() => {
    const loadCreative = async () => {
      await dispatch(getCreative(login.session.username));
    };
    if (login.loggedIn) {
      loadCreative();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  useEffect(() => {
    dispatch(resetStoreAction);
    if (formRef.current) {
      formRef.current.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="mb-2">
      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Control
          type="text"
          name="username" // Add name attribute
          placeholder="Username"
          value={formValues.username} // Set value from state
          onChange={handleChange} // Handle changes
          className="my-input"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Control
          type="password"
          name="password" // Add name attribute
          placeholder="Password"
          value={formValues.password} // Set value from state
          onChange={handleChange} // Handle changes
          className="my-input"
        />
      </Form.Group>
      {login.error && <p className="text-danger text-center">{login.error}</p>}
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
