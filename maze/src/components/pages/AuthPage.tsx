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
    <Container fluid className="pageContainer loginContainer">
      <Row>
        <Col className="col-6">
          <h3 className="mt-2">
            <span>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/visual/png/Pittogramma_light-green.png"
                }
                alt="logo"
                width={"15px"}
                className="me-3 mb-1"
              />
            </span>
            Show your creative work
            <br />
            <span>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/visual/png/Pittogramma_light-green.png"
                }
                alt="logo"
                width={"15px"}
                className="me-3"
              />
            </span>
            Find other talents
            <br />
            <span>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/visual/png/Pittogramma_light-green.png"
                }
                alt="logo"
                width={"15px"}
                className="me-3"
              />
            </span>
            Start collaborating
          </h3>
        </Col>
        <div id="loginBackground" />
        <Col className="authColumn">
          {signForm === "login" ? (
            <div className="w-100 text-center">
              <h2>Login</h2>
              <p>
                or{" "}
                <span onClick={handleClick} id="register" className="mazelink">
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
                <span onClick={handleClick} id="login" className="mazelink">
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
