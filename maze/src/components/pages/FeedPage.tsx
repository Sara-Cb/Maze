import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

function FeedPage() {
  return (
    <Container fluid>
      <Row>
        <div className="col-md-3 px-5">
          <Col className="p-3">
            <div className="d-flex justify-content-center mb-3 mt-2">
              <Image src="coffee/img-4.png" style={{ width: "150px" }} />
            </div>

            <Col className="text-center">
              <h2>John Doe</h2>
              <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
            </Col>

            <Col className="text-center">
              <Button variant="white" size="lg" active>
                Professional
              </Button>{" "}
            </Col>
            <br />
            <Col className="text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
            </Col>
          </Col>
        </div>
        <div className="col-md-9 px-5">
          {/* <div className="p-5 bg-primary"></div> */}
          <Row
            className="px-5"
            style={{
              height: "70vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="text-center px-3 py-3"
              style={{ alignItems: "center" }}
            >
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-2 p-20">
                  <img src="user.jpg" alt="" />
                </div>
                <div className="col-md-4 p-20">
                  <p style={{ alignItems: "center", fontWeight: "bolder" }}>
                    Stage Name
                  </p>
                  <p style={{ fontWeight: "bolder" }}>Look at my collections</p>
                </div>
                <div className="col-md-3"></div>
              </div>

              <div className="row px-5">
                <div
                  className="text-center p-10"
                  style={{
                    backgroundColor: "white",
                    alignContent: "center",
                    fontWeight: "700",
                  }}
                >
                  Updated Content
                </div>
              </div>
            </div>

            <div
              className="text-center px-3 py-3"
              style={{ alignItems: "center" }}
            >
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-2 p-20">
                  <img src="user.jpg" alt="" />
                </div>
                <div className="col-md-4 p-20">
                  <p style={{ alignItems: "center", fontWeight: "bolder" }}>
                    Stage Name
                  </p>
                  <p style={{ fontWeight: "bolder" }}>Look at my collections</p>
                </div>
                <div className="col-md-3"></div>
              </div>

              <div className="row px-5">
                <div
                  className="text-center p-10"
                  style={{
                    backgroundColor: "white",
                    alignContent: "center",
                    fontWeight: "700",
                  }}
                >
                  Updated Content
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Row>
    </Container>
  );
}

export default FeedPage;
