import express from "express";
import planetsRoutes from "./routes/planets";

import { initCorsMiddleware } from "./lib/middleware/cors";

const app = express();

app.use(express.json());

app.use(initCorsMiddleware);

app.use("/planets", planetsRoutes);

app.listen(3000, () => {
  console.log("Running on port", 3000);
});
