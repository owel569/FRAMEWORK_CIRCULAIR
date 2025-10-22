
/**
 * Types et constantes de validation centralisés
 * Pour uniformiser les règles entre tous les modules
 */

export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_MOROCCO: /^(\+212|0)[5-7][0-9]{8}$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
} as const;

export const VALIDATION_LENGTHS = {
  COMPANY_NAME: { min: 2, max: 100 },
  SECTOR: { min: 3, max: 100 },
  EMAIL: { min: 5, max: 255 },
  PHONE: { min: 10, max: 20 },
  PASSWORD: { min: 6, max: 255 },
  QUESTION_TEXT: { min: 10, max: 500 },
  QUESTION_ID: { min: 5, max: 50 },
} as const;

export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: "Format d'email invalide (ex: nom@entreprise.com)",
  PHONE_INVALID: "Numéro marocain invalide (+212XXXXXXXXX ou 0XXXXXXXXX)",
  PASSWORD_WEAK: "Le mot de passe doit contenir au moins 6 caractères",
  NAME_LENGTH: "Le nom doit contenir entre 2 et 100 caractères",
} as const;

export type ValidatedEmail = string & { __brand: 'ValidatedEmail' };
export type ValidatedPhone = string & { __brand: 'ValidatedPhone' };
export type ValidatedPassword = string & { __brand: 'ValidatedPassword' };
