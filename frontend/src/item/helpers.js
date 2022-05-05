export const parseErrors = (_error) => {
  const errors = { ..._error };
  if (_error && _error.hasOwnProperty("non_field_errors")) {
    errors.FORM_ERROR = errors.non_field_errors[0];
    delete errors.non_field_errors;
  }
  return errors;
};
