export const getErrors = errors =>
  errors.map(error => ({ name: error.value, message: error.msg }));
