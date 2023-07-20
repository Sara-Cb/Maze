import { Col, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MazeNavbar = () => {
  return (
    <Row>
      <Col>
        <Navbar expand="md">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Item>
                <Link className="nav-link" to="/home">
                  <img
                    src="%PUBLIC_URL%/visual/png/Logo_on_dark.png"
                    alt="logo"
                  />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/portfolio">
                  portfolio
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/feed">
                  feed
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default MazeNavbar;
