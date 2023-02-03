import express from "express";

import { initCorsMiddleware } from "./src/lib/middleware/cors";
import { initSessionMiddleware } from "./src/lib/middleware/session";
import { passport } from "./src/lib/middleware/passport";

import planetsRoutes from "./src/routes/planets";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/planets", planetsRoutes);

app.use(initCorsMiddleware);

app.listen(3000, () => {
  console.log("Running on port", 3000);
});
