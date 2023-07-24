import { Profession, Skill } from "../types/creativeType";

export const convertProfessions = (professions: Profession[]) => {
  const profArray: string[] = [];
  professions.map((profession: Profession) =>
    profArray.push(Profession[profession as keyof typeof Profession])
  );
  const professionString = profArray.join(", ");
  return professionString;
};

function formatSkill(skill: string): string {
  return skill
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function convertSkills(skills: Skill[]): string {
  const formattedSkills = skills.map(formatSkill);
  return formattedSkills.join(", ");
}

export function formatDate(inputDate: string): string {
  const dateObj = new Date(inputDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = String(dateObj.getFullYear());

  return `${month} ${day}, ${year}`;
}

export function formatTime(inputDate: string): string {
  const dateObj = new Date(inputDate);
  const now = new Date();
  const timeDiff = now.getTime() - dateObj.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years >= 1) {
    const remainingMonths = months % 12;
    return `${years}y ${remainingMonths}m`;
  } else if (months >= 1) {
    return `${months}m`;
  } else if (weeks >= 1) {
    return `${weeks}w`;
  } else if (days >= 1) {
    return `${days}d`;
  } else if (hours >= 1) {
    return `${hours}h`;
  } else if (minutes >= 1) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

export function formatCAPS(inputString: string): string {
  // Sostituisci '_' con spazi
  const stringWithSpaces = inputString.replace(/_/g, " ");

  // Converti la stringa in minuscolo
  const normalString = stringWithSpaces.toLowerCase();

  // Rendi maiuscola la prima lettera di ogni parola
  const words = normalString.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Unisci le parole separate da spazi e restituisci la stringa risultante
  return capitalizedWords.join(" ");
}
