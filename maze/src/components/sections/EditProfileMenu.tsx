import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { EditedCreative } from "../../types/creativeType";
import ProfessionsChoice from "../elements/ProfessionsChoice";
import { RegisterFormValues } from "./RegisterForm";
import { RootState, store } from "../../redux/store/store";
import { editMe } from "../../redux/actions/creativeAction";
import { useSelector } from "react-redux";
import SkillsChoice from "../elements/SkillsChoice";

const EditProfileMenu = (c: EditedCreative, pw: string) => {
  const dispatch = store.dispatch;
  const maxBioLength = 2000;
  const session = useSelector((state: RootState) => state.login.session);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [password, setPassword] = useState("");
  const [creative, setCreative] = useState({
    username: c.username,
    firstname: c.firstname,
    lastname: c.lastname,
    stageName: c.stageName,
    bio: c.bio,
    city: c.city,
    state: c.state,
    professions: c.professions,
    skills: c.skills,
  });

  const handleReset = () => {
    setCreative({
      username: c.username,
      firstname: c.firstname,
      lastname: c.lastname,
      stageName: c.stageName,
      bio: c.bio,
      city: c.city,
      state: c.state,
      professions: c.professions,
      skills: c.skills,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else {
      setCreative((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleEditCreative = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editMe(session!.accessToken, session!.username, creative));
  };

  const handleShowCredentials = () => setShowCredentials(true);
  const handleCloseCredentials = () => {
    setShowCredentials(false);
  };

  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="mazelink fs-2 green darkBg border-0 pe-0">
          <ThreeDotsVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu className="postEditMenu text-end mintBg">
          <Dropdown.Item onClick={handleShowCredentials}>
            <span>Change password </span>
            <i className="bi bi-lock"></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShowProfile}>
            <span>Edit profile </span>
            <i className="bi bi-pencil"></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShowProfile}>
            <span>Followed Creatives </span>
            <i className="bi bi-list-ul"></i>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/*PASSWORD CHANGE*/}
      <Modal show={showCredentials} onHide={handleCloseCredentials}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCredentials(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseCredentials();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/*PROFILE EDIT*/}
      <Modal show={showProfile} onHide={handleCloseProfile}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleEditCreative}
            onReset={handleReset}
            className="authForm"
            id="registerForm"
          >
            <Col>
              <Form.Group controlId="formStageName">
                <Form.Label>Stage Name</Form.Label>
                <Form.Control
                  type="text"
                  name="stageName"
                  placeholder="Enter stage name"
                  value={creative.stageName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="Enter first name"
                      value={creative.firstname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formLastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Enter last name"
                      value={creative.lastname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <ProfessionsChoice
                  formValues={null}
                  onChange={function (
                    formValues: RegisterFormValues
                  ): void | null {
                    throw new Error("Function not implemented.");
                  }}
                  creativeEdit={creative}
                  onSelect={setCreative}
                />
              </Row>

              <Row>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={creative.bio ? creative.bio : ""}
                    onChange={(e) =>
                      setCreative({
                        ...creative,
                        bio: e.target.value,
                      })
                    }
                    placeholder="Your bio here..."
                  />
                  <p className="small secondary text-end w-100">
                    {creative.bio?.length + "/" + maxBioLength}
                  </p>
                </Form.Group>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={creative.state || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={creative.city || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <SkillsChoice
                  formValues={null}
                  onChange={function (
                    formValues: RegisterFormValues
                  ): void | null {
                    throw new Error("Function not implemented.");
                  }}
                  creativeEdit={creative}
                  onSelect={setCreative}
                />
              </Row>
              <Row className="d-flex flex-row justify-content-between mt-3">
                <Button className="btnWhiteM w-25" onClick={handleCloseProfile}>
                  Close
                </Button>
                <Button className="btnDarkM w-25" type="reset">
                  Reset
                </Button>
                <Button className="btnGreenDark w-25" type="submit">
                  Save Edit
                </Button>
              </Row>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfileMenu;
