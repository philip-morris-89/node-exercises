import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
// import { validate, planetSchema, PlanetData } from "../lib/validation";
// import { checkAuthorization } from "../lib/middleware/passport";
import { initMulterMiddleware } from "../lib/middleware/multer";

const prisma = new PrismaClient();
const upload = initMulterMiddleware();
const router = Router();

router.post("/", async (request, response) => {
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

router.get("/", async (request, response) => {
  const planets = await prisma.planet.findMany();
  response.json(planets);
});

router.get("/:id", async (request, response) => {
  const planetId = request.params.id;
  const planet = await prisma.planet.findUnique({
    where: {
      id: Number(planetId),
    },
  });
  response.json(planet);
});

router.put("/:id", async (request, response) => {
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

router.delete("/:id", async (request, response) => {
  const planetId = request.params.id;
  const planet = await prisma.planet.delete({
    where: {
      id: Number(planetId),
    },
  });
  response.json(planet);
});

router.post(
  "/:id(\\d+)/photo",
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

router.use("/photos", express.static("uploads"));

export default router;
