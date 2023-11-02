import { AppError } from "../utilits/AppError.js";
export const validation = (schema) => {
  return (req, res, next) => {
    let input = { ...req.body, ...req.params, ...req.query};
    let { error } = schema.validate(input, { abortEarly: false });
    if (error) {
      let errors = error.details.map((detail) => detail.message);
      next(new AppError(`input in not valid ${errors}`, 403));
    } else {

      next();
    }
  };
};
