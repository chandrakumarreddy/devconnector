import authRouter from "./auth";
import usersRouter from "./users";
import postsRouter from "./posts";
import profileRouter from "./profile";

export default app => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  // app.get("/posts", postsRouter);
  // app.get("/profile", profileRouter);
  return app;
};
