import { ValidationError } from '../types/error';

const getFieldError = (error: ValidationError | null, fieldName: string) => {
  try {
    return error?.errors[fieldName].message;
  } catch {
    return undefined;
  }
};

export default getFieldError;
