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
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Navbar className="mazeNavbar fixed-top darkBg" expand="md">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="col-4 h-100">
            <Navbar.Brand as={Link} to={isNotLogged ? "/" : "/feed"}>
              <img
                className="navbarLogo"
                src={process.env.PUBLIC_URL + "/visual/png/Logo_on_dark.png"}
                alt="logo"
              />
            </Navbar.Brand>
          </Col>

          {isNotLogged ? (
            <>
              <Col className="col-2 d-flex align-items-center justify-content-end">
                <ResearchBar />
              </Col>
            </>
          ) : isLgScreen ? (
            <Col className="col-8">
              <Row className="align-items-center">
                <Col>
                  <ResearchBar />
                </Col>
                <Col>
                  <Nav className="m-auto justify-content-end">
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
            <Col className="col-8">
              <Nav className="d-flex justify-content-end mt-2">
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
                <ResearchBar />
                <LogoutButton />
              </Nav>
            </Col>
          ) : (
            <>
              <Col className="d-flex flex-row justify-content-end align-items-center">
                <ResearchBar />
                <span
                  className="bi bi-list d-block fs-5"
                  onClick={handleToggle}
                />
              </Col>
              <div id="maze-nav" className={isNavOpen ? "" : "d-none"}>
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
              </div>
            </>
          )}
        </Row>
      </Container>
      <div className="navUnderline" />
    </Navbar>
  );
};

export default MazeNavbar;
