import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

import { initMulterMiddleware } from "./src/lib/middleware/multer";

const upload = initMulterMiddleware();

const prisma = new PrismaClient();

const corsOption = {
  origin: "http://localhost:8080",
};

const app = express();
app.use(express.json());

app.use(cors(corsOption));

app.post("/planets", async (request, response) => {
  const { name, diameter, moons } = request.body;
  const planets = await prisma.planet.create({
    data: {
      name: name,
      diameter: diameter,
      moons: moons,
    },
  });
  response.json(planets);
});

app.get("/planets", async (request, response) => {
  const planets = await prisma.planet.findMany();
  response.json(planets);
});

app.get("/planets/:id", async (request, response) => {
  const planetId = request.params.id;
  const planet = await prisma.planet.findUnique({
    where: {
      id: Number(planetId),
    },
  });
  response.json(planet);
});

app.put("/planets/:id", async (request, response) => {
  const planetId = request.params.id;
  const { name, diameter, moons } = request.body;
  const planet = await prisma.planet.update({
    where: {
      id: Number(planetId),
    },
    data: {
      name: name,
      diameter: diameter,
      moons: moons,
    },
  });
  response.json(planet);
});

app.delete("/planets/:id", async (request, response) => {
  const planetId = request.params.id;
  const planet = await prisma.planet.delete({
    where: {
      id: Number(planetId),
    },
  });
  response.json(planet);
});

app.post(
  "/planets/:id(\\d+)/photo",
  upload.single("photo"),
  async (request, response, next) => {
    console.log("request.file", request.file);

    if (!request.file) {
      response.status(400);
      return next("No photo file uploaded.");
    }

    const planetId = Number(request.params.id);
    const photoFilename = request.file.filename;

    try {
      await prisma.planet.update({
        where: { id: planetId },
        data: { photoFilename },
      });
    } catch (error) {
      response.status(404);
      next(`Cannot POST /planets/${planetId}/photo`);
    }

    response.status(201).json({ photoFilename });
  }
);

app.use("/planets/photos", express.static("uploads"));

app.listen(3000, () => {
  console.log("Running on port", 3000);
});
