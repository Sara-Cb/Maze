import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Skill } from "../../types/creativeType";
import { RegisterFormValues } from "../sections/RegisterForm";

interface SkillsChoiceProps {
  formValues: RegisterFormValues;
  onChange: (formValues: RegisterFormValues) => void;
}

const SkillsChoice: React.FC<SkillsChoiceProps> = ({
  formValues,
  onChange,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleSkillChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSkillName = e.target.value;
    const selectedSkill = Object.keys(Skill).find(
      (key) => Skill[key as keyof typeof Skill] === selectedSkillName
    );
    setSelectedSkill(selectedSkill as Skill | null);
  };

  const handleAddSkill = () => {
    if (selectedSkill && !formValues.skills.includes(selectedSkill)) {
      const updatedSkills = [...formValues.skills, selectedSkill];
      const updatedFormValues = { ...formValues, skills: updatedSkills };
      onChange(updatedFormValues);
      setSelectedSkill(null);
    }
  };

  const handleRemoveSkill = (skill: Skill) => {
    const updatedSkills = formValues.skills.filter((s: Skill) => s !== skill);
    const updatedFormValues = { ...formValues, skills: updatedSkills };
    onChange(updatedFormValues);
  };

  useEffect(() => {
    setSelectedSkill(null);
  }, [formValues.skills]);

  return (
    <>
      <Form.Group controlId="formSkill">
        <Form.Label>Skill</Form.Label>
        <br />
        <Form.Select
          value={selectedSkill?.toString() || ""}
          onChange={handleSkillChange}
        >
          <option value="">Select a skill</option>
          {Object.keys(Skill).map((key) => (
            <option key={key} value={Skill[key as keyof typeof Skill]}>
              {Skill[key as keyof typeof Skill]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {formValues.skills.length > 0 && (
        <div>
          <p>Selected skills:</p>
          <ul>
            {formValues.skills.map((skill: Skill) => (
              <li key={skill}>
                {Skill[skill as unknown as keyof typeof Skill]}
                <Button variant="link" onClick={() => handleRemoveSkill(skill)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {formValues.skills.length < 3 && selectedSkill && (
        <Button variant="primary" onClick={handleAddSkill}>
          Add Skill
        </Button>
      )}
    </>
  );
};

export default SkillsChoice;
