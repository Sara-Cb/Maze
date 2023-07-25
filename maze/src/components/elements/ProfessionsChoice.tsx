import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { EditedCreative, Profession } from "../../types/creativeType";
import { RegisterFormValues } from "../sections/RegisterForm";

interface ProfessionsChoiceProps {
  formValues: RegisterFormValues | null;
  onChange: (formValues: RegisterFormValues) => void | null;
  creativeEdit: EditedCreative | null;
  onSelect: (creativeEdit: EditedCreative) => void | null;
}

const ProfessionsChoice: React.FC<ProfessionsChoiceProps> = ({
  formValues,
  onChange,
  creativeEdit,
  onSelect,
}) => {
  const [selectedProfession, setSelectedProfession] = useState<
    Profession | undefined
  >(undefined);

  const handleProfessionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedProfessionName = e.target.value;
    const selectedProfession = Object.keys(Profession).find(
      (key) =>
        Profession[key as keyof typeof Profession] === selectedProfessionName
    );
    setSelectedProfession(selectedProfession as Profession | undefined);
  };

  const handleAddProfession = () => {
    if (
      formValues &&
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
      setSelectedProfession(undefined);
    }
    if (
      creativeEdit &&
      selectedProfession &&
      !creativeEdit.professions.includes(selectedProfession)
    ) {
      const updatedProfessions = [
        ...creativeEdit.professions,
        selectedProfession,
      ];
      const updatedCreative = {
        ...creativeEdit,
        professions: updatedProfessions,
      };
      onSelect(updatedCreative);
      setSelectedProfession(undefined);
    }
  };

  const handleRemoveProfession = (profession: Profession) => {
    if (formValues) {
      const updatedProfessions = formValues.professions.filter(
        (p: Profession) => p !== profession
      );
      const updatedFormValues = {
        ...formValues,
        professions: updatedProfessions,
      };
      onChange(updatedFormValues);
    }
    if (creativeEdit) {
      const updatedProfessions = creativeEdit.professions.filter(
        (p: Profession) => p !== profession
      );
      const updatedFormValues = {
        ...creativeEdit,
        professions: updatedProfessions,
      };
      onSelect(updatedFormValues);
    }
  };

  useEffect(() => {
    setSelectedProfession(undefined);
  }, [formValues?.professions, creativeEdit?.professions]);

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
            <option key={key} value={selectedProfession}>
              {Profession[key as keyof typeof Profession]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {formValues && formValues.professions.length > 0 && (
        <div className="text-start">
          <p>Selected professions:</p>
          <ul>
            {formValues.professions.map((profession: Profession) => (
              <li key={profession}>
                {Profession[profession as keyof typeof Profession]}
                <Button
                  className="ms-2 btnDark"
                  onClick={() => handleRemoveProfession(profession)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {creativeEdit && creativeEdit.professions.length > 0 && (
        <div className="text-start">
          <p>Selected professions:</p>
          <ul>
            {creativeEdit.professions.map((profession: Profession) => (
              <li key={profession}>
                {Profession[profession as keyof typeof Profession]}
                <button
                  className="emptyDarkBtn"
                  onClick={() => handleRemoveProfession(profession)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {formValues &&
        formValues.professions.length < 3 &&
        selectedProfession && (
          <Button className="btnLight" onClick={handleAddProfession}>
            Add Profession
          </Button>
        )}
      {creativeEdit &&
        creativeEdit.professions.length < 3 &&
        selectedProfession && (
          <Button className="btnLight" onClick={handleAddProfession}>
            Add Profession
          </Button>
        )}
    </>
  );
};

export default ProfessionsChoice;
