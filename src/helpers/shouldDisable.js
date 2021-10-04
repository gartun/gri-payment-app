//eslint-disable-next-line
export default (errs, vals, isSubmitting) => {
  if (isSubmitting) return true;

  if (Object.keys(errs).length > 0) return true;

  const requiredFields = ["email", "pwd"];

  requiredFields.forEach((field) => {
    if (vals[field].trim().length === 0) {
      return true;
    }
  });

  return false;
};
