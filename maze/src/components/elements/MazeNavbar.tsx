import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ResearchBar from "./ResearchBar";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const MazeNavbar = () => {
  const location = useLocation();
  const login = useSelector((state: RootState) => state.login);
  const isNotLogged = !login.loggedIn;

  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);
  const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1200);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1200);
      setIsMdScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/portfolio/me") {
      setActiveLink("p");
    } else if (location.pathname === "/feed") {
      setActiveLink("f");
    }
  }, [location]);

  return (
    <Navbar className="mazeNavbar">
      <Container fluid>
        <Row>
          <Col className="col-4">
            <Navbar.Brand as={Link} to="/home">
              <img
                className="navbarLogo"
                src={process.env.PUBLIC_URL + "/visual/png/Logo_on_dark.png"}
                alt="logo"
              />
            </Navbar.Brand>
          </Col>

          {isNotLogged ? (
            <Col className="col-4">
              <ResearchBar />
            </Col>
          ) : isLgScreen ? (
            <Col className="col-8">
              <Row>
                <Col>
                  <ResearchBar />
                </Col>
                <Col>
                  <Nav className="m-auto">
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        to="/portfolio/me"
                        className={activeLink === "p" ? "active" : ""}
                      >
                        Portfolio
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        as={Link}
                        to="/feed"
                        className={activeLink === "f" ? "active" : ""}
                      >
                        Feed
                      </Nav.Link>
                    </Nav.Item>
                    <LogoutButton />
                  </Nav>
                </Col>
              </Row>
            </Col>
          ) : isMdScreen ? (
            <>
              <ResearchBar />
              <Navbar.Toggle
                aria-controls="maze-nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="bi bi-list" />
              </Navbar.Toggle>
              <Navbar.Collapse id="maze-nav">
                <Nav className="m-auto">
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/portfolio/me"
                      className={activeLink === "p" ? "active" : ""}
                    >
                      Portfolio
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/feed"
                      className={activeLink === "f" ? "active" : ""}
                    >
                      Feed
                    </Nav.Link>
                  </Nav.Item>
                  <LogoutButton />
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <ResearchBar />
              <Navbar.Toggle
                aria-controls="maze-nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="bi bi-list" />
              </Navbar.Toggle>
              <Navbar.Collapse id="maze-nav">
                <Nav className="m-auto">
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/portfolio/me"
                      className={activeLink === "p" ? "active" : ""}
                    >
                      Portfolio
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/feed"
                      className={activeLink === "f" ? "active" : ""}
                    >
                      Feed
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <LogoutButton />
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Row>
      </Container>
    </Navbar>
  );
};

export default MazeNavbar;
