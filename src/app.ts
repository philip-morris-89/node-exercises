import express from "express";

import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";

import planetsRoutes from "./routes/planets";
import authRoutes from "./routes/auth";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/planets", planetsRoutes);

app.use("/auth", authRoutes);

app.use(initCorsMiddleware);

app.listen(3000, () => {
  console.log("Running on port", 3000);
});

export default app;
