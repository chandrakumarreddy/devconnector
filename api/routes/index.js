import authRouter from "./auth";
import usersRouter from "./users";
import postsRouter from "./posts";
import profileRouter from "./profile";

export default app => {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  // app.get("/posts", postsRouter);
  // app.get("/profile", profileRouter);
  return app;
};
