import Joi from "joi";

export const chekIdCourseSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});
export const editCourseSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  courseName: Joi.string().min(2).max(25),
  courseContent: Joi.string().min(3)
});

export const addCourseSchema = Joi.object({
  courseName: Joi.string().min(2).max(25).required(),
  courseContent: Joi.string().min(3).required(),
  teacher: Joi.string().hex().length(24).required()
});
