import { Col, Container, Row, Form } from "react-bootstrap";
import { getAllCreatives } from "../../redux/actions/allCreativesAction";
import { Creative, Profession, Skill } from "../../types/creativeType";
import { useEffect, useState } from "react";
import { RootState, store } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertProfessions, convertSkills } from "../../helpers/helpers";

const SearchPage = () => {
  const dispatch = store.dispatch;

  const allCreatives = useSelector((state: RootState) => state.allCreatives);
  const [creatives, setCreatives] = useState(allCreatives.c);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: "",
    profession: "",
    skill: "",
    city: "",
    state: "",
  });

  const getFilteredCreatives = () => {
    let filteredCreatives = allCreatives.c;

    if (filters.name) {
      filteredCreatives = filteredCreatives.filter(
        (creative) =>
          creative.firstname.includes(filters.name) ||
          creative.lastname.includes(filters.name) ||
          creative.stageName.includes(filters.name) ||
          creative.username.includes(filters.name)
      );
    }

    if (filters.profession) {
      filteredCreatives = filteredCreatives.filter((creative) =>
        convertProfessions(creative.professions).includes(filters.profession)
      );
    }

    if (filters.skill) {
      filteredCreatives = filteredCreatives.filter((creative) =>
        convertSkills(creative.skills).includes(filters.skill)
      );
    }

    if (filters.city) {
      filteredCreatives = filteredCreatives.filter(
        (creative) => creative.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.state) {
      filteredCreatives = filteredCreatives.filter(
        (creative) =>
          creative.state.toLowerCase() === filters.state.toLowerCase()
      );
    }

    setCreatives(filteredCreatives);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getCreatives = async () => {
    await dispatch(getAllCreatives());
    setCreatives(allCreatives.c);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getCreatives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFilteredCreatives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Container
      fluid
      className="pageContainer searchContainer d-flex justify-content-center align-items-start"
    >
      {!loading && (
        <Row style={{ maxWidth: 1020 }}>
          <Col xs={12} className="ps-0">
            <Form.Control
              type="search"
              name="name"
              placeholder="Search by name"
              value={filters.name || ""}
              onChange={handleChange}
              className="w-100 mt-2 mb-4"
            />
          </Col>
          <Col xs={3} className="d-none d-md-block text-center filters">
            <Row>
              <h4>Fiter by:</h4>
            </Row>
            <Row>
              <Form>
                <Form.Select
                  value={filters.profession || ""}
                  onChange={handleChange}
                  name="profession"
                >
                  <option value="">Profession</option>
                  {Object.keys(Profession).map((key) => (
                    <option
                      key={key}
                      value={Profession[key as keyof typeof Profession]}
                    >
                      {Profession[key as keyof typeof Profession]}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={filters.skill.toString() || ""}
                  name="skill"
                  onChange={handleChange}
                >
                  <option value="">Skill</option>
                  {Object.keys(Skill).map((key) => (
                    <option key={key} value={Skill[key as keyof typeof Skill]}>
                      {Skill[key as keyof typeof Skill]}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="search"
                  name="city"
                  placeholder="City"
                  value={filters.city || ""}
                  onChange={handleChange}
                />
                <Form.Control
                  type="search"
                  name="state"
                  placeholder="State"
                  value={filters.state || ""}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btnDark"
                  onClick={getFilteredCreatives}
                >
                  Apply Filters
                </button>
              </Form>
            </Row>
          </Col>
          <Col xs={12} md={9}>
            {creatives.length > 0 && (
              <div>
                {creatives.map((creative: Creative) => {
                  return (
                    <Link to={`/portfolio/${creative.username}`}>
                      <Row
                        key={creative.username}
                        className="mintBg dark mb-2 pt-3 searchResult mx-1"
                      >
                        <Col
                          xs={3}
                          className="d-flex flex-column justify-content-between align-items-center"
                        >
                          <img
                            src={creative.image}
                            alt="creative pic"
                            width={100}
                            height={100}
                          />
                          <p className="small">
                            {creative.city}, {creative.state}
                          </p>
                        </Col>
                        <Col
                          xs={9}
                          className="d-flex flex-column justify-content-between"
                        >
                          <div>
                            <h4>{creative.stageName}</h4>
                            <p className="fw-bold green">
                              {convertProfessions(creative.professions)}
                            </p>
                          </div>
                          <p className="small">
                            Skills: <br />
                            <span className="fw-bold">
                              {convertSkills(creative.skills)}
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </Link>
                  );
                })}
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SearchPage;
