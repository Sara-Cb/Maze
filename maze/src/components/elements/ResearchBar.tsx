import { Form } from "react-bootstrap";

const ResearchBar = () => {
  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Search creatives"
        aria-label="Search"
      />
    </Form>
  );
};

export default ResearchBar;
