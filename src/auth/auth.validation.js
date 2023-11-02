import Joi from "joi";

const passwordPattern =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const authSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).max(30).regex(passwordPattern).required(),
  role: Joi.string().valid("student", "teacher"),
  profileImg: Joi.any( )
});
