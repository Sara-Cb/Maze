import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Profession } from "../../types/creativeType";
import { RegisterFormValues } from "../sections/RegisterForm";

interface ProfessionsChoiceProps {
  formValues: RegisterFormValues;
  onChange: (formValues: RegisterFormValues) => void;
}

const ProfessionsChoice: React.FC<ProfessionsChoiceProps> = ({
  formValues,
  onChange,
}) => {
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);

  const handleProfessionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedProfessionName = e.target.value;
    const selectedProfession = Object.keys(Profession).find(
      (key) =>
        Profession[key as keyof typeof Profession] === selectedProfessionName
    );
    setSelectedProfession(selectedProfession as Profession | null);
  };

  const handleAddProfession = () => {
    if (
      selectedProfession &&
      !formValues.professions.includes(selectedProfession)
    ) {
      const updatedProfessions = [
        ...formValues.professions,
        selectedProfession,
      ];
      const updatedFormValues = {
        ...formValues,
        professions: updatedProfessions,
      };
      onChange(updatedFormValues);
      setSelectedProfession(null);
    }
  };

  const handleRemoveProfession = (profession: Profession) => {
    const updatedProfessions = formValues.professions.filter(
      (p: Profession) => p !== profession
    );
    const updatedFormValues = {
      ...formValues,
      professions: updatedProfessions,
    };
    onChange(updatedFormValues);
  };

  useEffect(() => {
    setSelectedProfession(null);
  }, [formValues.professions]);

  return (
    <>
      <Form.Group controlId="formProfession">
        <Form.Label>Profession</Form.Label>
        <br />
        <Form.Select
          value={selectedProfession || ""}
          onChange={handleProfessionChange}
        >
          <option value="">Select a profession</option>
          {Object.keys(Profession).map((key) => (
            <option
              key={key}
              value={Profession[key as keyof typeof Profession]}
            >
              {Profession[key as keyof typeof Profession]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {formValues.professions.length > 0 && (
        <div>
          <p>Selected professions:</p>
          <ul>
            {formValues.professions.map((profession: Profession) => (
              <li key={profession}>
                {Profession[profession as keyof typeof Profession]}
                <Button
                  variant="link"
                  onClick={() => handleRemoveProfession(profession)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {formValues.professions.length < 3 && selectedProfession && (
        <Button variant="primary" onClick={handleAddProfession}>
          Add Profession
        </Button>
      )}
    </>
  );
};

export default ProfessionsChoice;
