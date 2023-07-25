import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import registerFetch from "../../redux/actions/registerAction";
import { store, RootState, resetStoreAction } from "../../redux/store/store";
import { EditedCreative, Profession, Skill } from "../../types/creativeType";
import ProfessionsChoice from "../elements/ProfessionsChoice";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  stageName: string;
  professions: Profession[];
  city: string;
  state: string;
  bio: string;
  skills: Skill[];
}

const RegisterForm: React.FC = () => {
  const dispatch = store.dispatch;
  const register = useSelector((state: RootState) => state.register);
  const formRef = useRef<HTMLFormElement>(null);

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    stageName: "",
    professions: [],
    bio: "",
    city: "",
    state: "",
    skills: [],
  });

  useEffect(() => {
    dispatch(resetStoreAction);
    if (formRef.current) {
      formRef.current.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerFetch(formValues));
  };

  const handleReset = () => {
    setFormValues({
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      stageName: "",
      professions: [],
      city: "",
      state: "",
      bio: "",
      skills: [],
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="authForm"
      id="registerForm"
    >
      <Col>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formValues.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formValues.password}
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
                value={formValues.firstname}
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
                value={formValues.lastname}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formStageName">
          <Form.Label>Stage Name</Form.Label>
          <Form.Control
            type="text"
            name="stageName"
            placeholder="Enter stage name"
            value={formValues.stageName}
            onChange={handleChange}
          />
        </Form.Group>

        <ProfessionsChoice
          formValues={formValues}
          onChange={setFormValues}
          creativeEdit={null}
          onSelect={function (creativeEdit: EditedCreative): void | null {
            throw new Error("Function not implemented.");
          }}
        />

        <Row>
          <Col>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Enter state"
                value={formValues.state || ""}
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
                value={formValues.city || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex flex-row justify-content-end mt-3">
          <Button className="btnGreen w-25" type="submit">
            Register
          </Button>
          <Button className="btnLight w-25" type="reset">
            Reset
          </Button>
          {register.error && <p className="text-danger">{register.error}</p>}
        </Row>
      </Col>
    </Form>
  );
};

export default RegisterForm;
