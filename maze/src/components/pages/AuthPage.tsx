import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LoginForm from "../sections/LoginForm";
import RegisterForm from "../sections/RegisterForm";
import { useNavigate } from "react-router";
import { getMe } from "../../redux/actions/creativeAction";

const AuthPage = () => {
  const login = useSelector((state: RootState) => state.login);
  const [signForm, setSignForm] = useState("login");
  const navigate = useNavigate();
  const dispatch = store.dispatch;

  const handleClick: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    const name = event.currentTarget.getAttribute("id");
    if (name) {
      setSignForm(name);
    }
  };

  async function welcome() {
    await dispatch(getMe(login.session!.username));
  }

  useEffect(() => {
    if (login.loggedIn) {
      welcome();
      navigate("/feed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Container fluid className="pageContainer authContainer">
      <Row>
        <Col
          xs={6}
          className="d-none d-md-flex flex-column justify-content-center"
        >
          <div className="welcome">
            <h3>Show your creative work</h3>
            <h3>Find other talents</h3>
            <h3>Start collaborating</h3>
          </div>
        </Col>
        <div id="loginBackground" />
        <Col className="authColumn pe-0">
          {signForm === "login" ? (
            <div className="w-100 text-center">
              <h2>Login</h2>
              <p>
                or{" "}
                <span
                  onClick={handleClick}
                  id="register"
                  className="mazelink green fw-bold"
                >
                  register
                </span>{" "}
                to join Maze!
              </p>
              <LoginForm />
            </div>
          ) : (
            <div className="w-100 text-center">
              <h2>Register</h2>
              <p>
                or{" "}
                <span
                  onClick={handleClick}
                  id="login"
                  className="mazelink green fw-bold"
                >
                  login
                </span>{" "}
                with your account
              </p>
              <RegisterForm />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
