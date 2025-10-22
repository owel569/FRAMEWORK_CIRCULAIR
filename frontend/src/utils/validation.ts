
/**
 * Utilitaires de validation pour le frontend
 * Uniformisation des règles de validation avec le backend
 */

export const VALIDATION_RULES = {
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Format d'email invalide (ex: nom@entreprise.com)"
  },
  phone: {
    pattern: /^(\+212|0)[5-7][0-9]{8}$/,
    message: "Numéro marocain invalide (+212XXXXXXXXX ou 0XXXXXXXXX)"
  },
  companyName: {
    minLength: 2,
    maxLength: 100,
    message: "Le nom doit contenir entre 2 et 100 caractères"
  },
  password: {
    minLength: 6,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre"
  }
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.email.pattern.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION_RULES.phone.pattern.test(phone);
};

export const validateCompanyName = (name: string): boolean => {
  return name.length >= VALIDATION_RULES.companyName.minLength && 
         name.length <= VALIDATION_RULES.companyName.maxLength;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.password.minLength;
};

export const formatPhoneNumber = (phone: string): string => {
  // Normalise le numéro au format international
  if (phone.startsWith('0')) {
    return '+212' + phone.substring(1);
  }
  return phone;
};

export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return validateEmail(value) ? null : VALIDATION_RULES.email.message;
    case 'phone':
      return validatePhone(value) ? null : VALIDATION_RULES.phone.message;
    case 'companyName':
      return validateCompanyName(value) ? null : VALIDATION_RULES.companyName.message;
    case 'password':
      return validatePassword(value) ? null : VALIDATION_RULES.password.message;
    default:
      return null;
  }
};
