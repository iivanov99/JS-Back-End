module.exports = (err) => {
  const errors = [];
  Object.keys(err.errors).forEach(errorKey => errors.push(err.errors[errorKey]));
  return errors;
};