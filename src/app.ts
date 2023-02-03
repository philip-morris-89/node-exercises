import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.get("/planets", async (request, response) => {
  //  response.send("Up and running!");
  // response.json([{ name: "Jupiter" }, { name: "Mars" }]);
  const planets = await prisma.planet.findMany();

  response.json(planets);
});

export default app;
