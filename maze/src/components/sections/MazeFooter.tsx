import { Container, Row, Col } from "react-bootstrap";

const MazeFooter = () => {
  return (
    <footer className="py-4 text-center text-md-start">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={12}>
            <h5>About Maze</h5>
            <p className="mint">
              Maze is a creative platform designed to connect and empower
              creative professionals from various industries. Showcase your
              work, collaborate on exciting projects, and network with other
              talented individuals.
            </p>
          </Col>
          <Col xs={12} md={6} lg={12}>
            <h5>Contacts</h5>
            <p className="mint">
              <i className="bi bi-envelope me-3"></i>
              <a
                href="mailto:sara.cb@amazestudio.it"
                target="blank"
                className="mazelink"
              >
                sara.cb@amazestudio.it
              </a>
              <br />
              <i className="bi bi-phone me-3"></i>
              <a href="tel:+393316894050" target="blank" className="mazelink">
                +39 331 689 4050
              </a>
              <br />
              <i className="bi bi-github me-3"></i>
              <a
                href="https://github.com/Sara-Cb"
                target="blank"
                className="mazelink"
              >
                Sara-Cb
              </a>
              <br />
              <i className="bi bi-linkedin me-3"></i>
              <a
                href="https://www.linkedin.com/in/sara-campobasso/"
                target="blank"
                className="mazelink"
              >
                Sara Campobasso
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="text-center text-lg-start green">
              &copy; {new Date().getFullYear()} Maze. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MazeFooter;
