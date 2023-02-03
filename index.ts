import express from "express";
import cors from "cors";
import planetsRoutes from "./src/routes/planets";

const corsOption = {
  origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOption));

app.use("/planets", planetsRoutes);

app.listen(3000, () => {
  console.log("Running on port", 3000);
});
