import { Container } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <Container fluid className="pageContainer">
      <div className="centeringDiv w-100 h-100">
        <div>
          <h2>Ops! Looks like there's nothing here!</h2>
        </div>
      </div>
    </Container>
  );
};

export default PageNotFound;
