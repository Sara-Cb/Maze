import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../../redux/actions/meAction";
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
      await dispatch(getMe(login.session.username));
    };
    if (login.loggedIn) {
      loadCreative();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <Container fluid className="pageContainer">
      <Row>
        <Col>
          <Col className="col-6">
            <h1>Welcome to maze</h1>
            <h2>
              Show your creative work, find other talents and start
              collaborating!
            </h2>
          </Col>
        </Col>
        <Col>
          <Row>
            <Col>
              <h4>
                <span onClick={handleClick} id="login" className="mazelink">
                  Login
                </span>
                /
                <span onClick={handleClick} id="register" className="mazelink">
                  Register
                </span>
              </h4>
              {signForm === "login" ? <LoginForm /> : <RegisterForm />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
