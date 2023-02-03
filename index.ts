import express from "express";
import planetsRoutes from "./src/routes/planets";

import { initCorsMiddleware } from "./src/lib/middleware/cors";

const app = express();

app.use(express.json());

app.use("/planets", planetsRoutes);

app.use(initCorsMiddleware);

app.listen(3000, () => {
  console.log("Running on port", 3000);
});
