import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import registerFetch from "../../redux/actions/registerAction";
import { store, RootState, resetStoreAction } from "../../redux/store/store";
import { Profession, Skill } from "../../types/creativeType";
import ProfessionsChoice from "../elements/ProfessionsChoice";
import SkillsChoice from "../elements/SkillsChoice";

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
  const me = useSelector((state: RootState) => state.me);
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
    <Form onSubmit={handleSubmit} onReset={handleReset}>
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

      <ProfessionsChoice formValues={formValues} onChange={setFormValues} />

      <Form.Group controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="bio"
          placeholder="Enter bio"
          value={formValues.bio || ""}
          onChange={handleChange}
        />
      </Form.Group>

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

      <SkillsChoice formValues={formValues} onChange={setFormValues} />

      <Button variant="primary" type="submit">
        Register
      </Button>
      <Button variant="secondary" type="reset">
        Reset
      </Button>
      {register.error && <p className="text-danger">{register.error}</p>}
      <p>{me.creative && <span>{me.creative.firstname}</span>}</p>
    </Form>
  );
};

export default RegisterForm;
