import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCreative } from "../../redux/actions/creativeAction";
import LoginForm from "../sections/LoginForm";
import RegisterForm from "../sections/RegisterForm";

const LoginPage = () => {
  const dispatch = store.dispatch;

  const login = useSelector((state: RootState) => state.login);
  const [signForm, setSignForm] = useState("login");

  const handleClick: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    const name = event.currentTarget.getAttribute("id");
    if (name) {
      setSignForm(name);
    }
  };

  useEffect(() => {
    const loadCreative = async () => {
      await dispatch(getCreative(login.session.username));
    };
    if (login.loggedIn) {
      loadCreative();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Container fluid>
      <Row>
        <Col className="col-6">
          <h1>Welcome</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut
            dicta sequi omnis sint
          </h2>
        </Col>
        <Col>
          <h4>
            <span onClick={handleClick} id="login">
              Login
            </span>
            /
            <span onClick={handleClick} id="register">
              Register
            </span>
          </h4>
          {signForm === "login" ? <LoginForm /> : <RegisterForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
