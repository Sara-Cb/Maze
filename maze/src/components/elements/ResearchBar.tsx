import { Form } from "react-bootstrap";

const ResearchBar = () => {
  return (
    <Form className="searchForm">
      <span className="bi bi-search"></span>
      <Form.Control
        type="search"
        placeholder="Search creatives"
        aria-label="Search"
      />
    </Form>
  );
};

export default ResearchBar;
