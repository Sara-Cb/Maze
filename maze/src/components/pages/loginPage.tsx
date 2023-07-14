import { FormEvent, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCreative } from "../../redux/actions/creativeAction";
import LoginForm from "../sections/LoginForm";

const LoginPage = () => {
  const dispatch = store.dispatch;

  const login = useSelector((state: RootState) => state.login);

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
          <h1 className="text-primary mb-2">Welcome</h1>
          <h2 className="text-secondary small mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut
            dicta sequi omnis sint
          </h2>
        </Col>
        {
          <Col>
            <LoginForm />
          </Col>
        }
      </Row>
    </Container>
  );
};

export default LoginPage;
