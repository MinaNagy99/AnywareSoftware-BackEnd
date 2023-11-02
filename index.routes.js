import globalErrorHandeling from "./globalErrorHandling.js";
import announcementRouter from "./src/announcement/announcement.router.js";
import authRouter from "./src/auth/auth.router.js";
import courseRouter from "./src/course/course.router.js";
import quizRouter from "./src/quiz/quiz.router.js";
import userRouter from "./src/user/user.router.js";
import { AppError } from "./utilits/AppError.js";

export function init(app) {
  app.use("/auth", authRouter);
  app.use("/announcement", announcementRouter);
  app.use("/quiz", quizRouter);
  app.use("/course", courseRouter);
  app.use("/user", userRouter);
  app.all("*", (req, res, next) => {
    next(new AppError("can't find this route"), 404);
  });
  app.use(globalErrorHandeling);
}
