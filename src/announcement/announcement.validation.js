import Joi from "joi";

export const createAnnouncementSchema = Joi.object({
  titleAnnouncement: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().required()
});

export const chekIdAnnouncementSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const editAnnouncementSchmea = Joi.object({
  id: Joi.string().hex().length(24).required(),
  titleAnnouncement: Joi.string().min(5),
  desciption: Joi.string().min(10),
  date: Joi.date()
});
