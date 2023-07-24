import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { EditedCreative, Skill } from "../../types/creativeType";
import { RegisterFormValues } from "../sections/RegisterForm";

interface SkillsChoiceProps {
  formValues: RegisterFormValues | null;
  creativeEdit: EditedCreative | null;
  onChange: (formValues: RegisterFormValues) => void | null;
  onSelect: (creativeEdit: EditedCreative) => void | null;
}

const SkillsChoice: React.FC<SkillsChoiceProps> = ({
  formValues,
  creativeEdit,
  onChange,
  onSelect,
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
    if (formValues) {
      if (selectedSkill && !formValues.skills.includes(selectedSkill)) {
        const updatedSkills = [...formValues.skills, selectedSkill];
        const updatedFormValues = { ...formValues, skills: updatedSkills };
        onChange(updatedFormValues);
        setSelectedSkill(null);
      }
    }
    if (creativeEdit) {
      if (selectedSkill && !creativeEdit.skills.includes(selectedSkill)) {
        const updatedSkills = [...creativeEdit.skills, selectedSkill];
        const updatedCreative = { ...creativeEdit, skills: updatedSkills };
        onSelect(updatedCreative);
        setSelectedSkill(null);
      }
    }
  };

  const handleRemoveSkill = (skill: Skill) => {
    if (formValues) {
      const updatedSkills = formValues.skills.filter((s: Skill) => s !== skill);
      const updatedFormValues = { ...formValues, skills: updatedSkills };
      onChange(updatedFormValues);
    }
    if (creativeEdit) {
      const updatedSkills = creativeEdit.skills.filter(
        (s: Skill) => s !== skill
      );
      const updatedCreativeEdit = { ...creativeEdit, skills: updatedSkills };
      onSelect(updatedCreativeEdit);
    }
  };

  useEffect(() => {
    setSelectedSkill(null);
  }, [formValues?.skills, creativeEdit?.skills]);

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
      {formValues && formValues.skills.length > 0 && (
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
      {creativeEdit && creativeEdit.skills.length > 0 && (
        <div>
          <p>Selected skills:</p>
          <ul>
            {creativeEdit.skills.map((skill: Skill) => (
              <li key={skill}>
                {Skill[skill as unknown as keyof typeof Skill]}
                <button
                  className="emptyDarkBtn"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {formValues && formValues.skills.length < 10 && selectedSkill && (
        <Button variant="primary" onClick={handleAddSkill}>
          Add Skill
        </Button>
      )}
      {creativeEdit && creativeEdit.skills.length < 10 && selectedSkill && (
        <Button variant="primary" onClick={handleAddSkill}>
          Add Skill
        </Button>
      )}
    </>
  );
};

export default SkillsChoice;
