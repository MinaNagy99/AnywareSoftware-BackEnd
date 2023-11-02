import { Router } from "express";
import { allowedTo } from "../../middleWare/allowedTo.js";
import { validation } from "../../middleWare/validation.js";
import { verifyToken } from "../../middleWare/veriftToken.js";
import * as announcement from "./announcement.controller.js";
import {
  chekIdAnnouncementSchema,
  createAnnouncementSchema
} from "./announcement.validation.js";

const announcementRouter = Router();

announcementRouter;

announcementRouter
  .route("/")
  .get(verifyToken, allowedTo("teacher","student"), announcement.getAllAnnouncement)
  .post(
    verifyToken,
    allowedTo("teacher"),
    validation(createAnnouncementSchema),
    announcement.addAnnouncement
  );
announcementRouter
  .route("/:id")
  .get(
    verifyToken,
    allowedTo("teacher", "student"),
    validation(chekIdAnnouncementSchema),
    announcement.getSpasificAnnouncement
  )
  .delete(
    verifyToken,
    allowedTo("teacher", "student"),
    validation(chekIdAnnouncementSchema),
    announcement.deleteAnnouncement
  )
  .put(
    verifyToken,
    allowedTo("teacher", "student"),
    validation(chekIdAnnouncementSchema),
    announcement.editAnnouncement
  );
export default announcementRouter;
