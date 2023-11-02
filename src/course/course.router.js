import { Router } from "express";
import { allowedTo } from "../../middleWare/allowedTo.js";
import { verifyToken } from "../../middleWare/veriftToken.js";
import { validation } from "../../middleWare/validation.js";
import * as course from "./course.controller.js";
import {
  addCourseSchema,
  chekIdCourseSchema,
  editCourseSchema
} from "./course.validation.js";

const courseRouter = Router();

courseRouter
  .route("/")
  .get(verifyToken, allowedTo("teacher", "student"), course.getAllCourses)
  .post(
    verifyToken,
    allowedTo("teacher"),
    validation(addCourseSchema),
    course.addCourse
  );
courseRouter
  .route("/:id")
  .get(
    verifyToken,
    allowedTo("teacher", "student"),
    validation(chekIdCourseSchema),
    course.getSpasificCourse
  )
  .put(
    verifyToken,
    allowedTo("teacher"),
    validation(editCourseSchema),
    course.editCourse
  )
  .delete(
    verifyToken,
    allowedTo("teacher"),
    validation(chekIdCourseSchema),
    course.deleteCourse
  );

  export default courseRouter
