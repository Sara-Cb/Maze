import { Profession } from "../types/creativeType";

export const convertProfessions = (professions: Profession[]) => {
  const profArray: string[] = [];
  professions.map((profession: Profession) =>
    profArray.push(Profession[profession as keyof typeof Profession])
  );
  const professionString = profArray.join(", ");
  return professionString;
};
