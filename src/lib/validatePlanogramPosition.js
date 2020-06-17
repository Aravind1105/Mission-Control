const validatePlanogramPosition = value => {
  let error;
  if (!/^[A-Z]\d{2}$/.test(value)) {
    error = 'Invalid format of position.';
  }
  return error;
};

export default validatePlanogramPosition;
