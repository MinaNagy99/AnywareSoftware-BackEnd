import Joi from "joi";

export const checkQuizIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});
export const addQuizSchema = Joi.object({
  quizName: Joi.string().min(5).required(),
  topic: Joi.string().min(10).required(),
  quizDate: Joi.date(),
  course: Joi.string().hex().length(24).required()
});

export const editeQuizSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  quizName: Joi.string().min(5),
  quizDescription: Joi.string().min(10),
  quizDate: Joi.date(),
  course: Joi.string().hex().length(24)
});
