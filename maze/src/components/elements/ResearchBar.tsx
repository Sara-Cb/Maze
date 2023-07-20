import { FormEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ResearchBar = () => {
  const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1200);
  const [research, setResearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const searchCreatives = () => {};

  const handleChange = (e: { target: { value: string } }) => {
    setResearch(e.target.value);
  };
  const handleClick = () => {
    searchCreatives();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchCreatives();
  };

  return (
    <>
      {isLgScreen ? (
        <Form className="searchForm" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Search creatives"
            aria-label="Search"
            value={research}
            onChange={handleChange}
          />
          <span className="bi bi-search" onClick={handleClick}></span>
        </Form>
      ) : (
        <Link to="/search" className="searchForm">
          <span className="bi bi-search"></span>
        </Link>
      )}
    </>
  );
};

export default ResearchBar;
