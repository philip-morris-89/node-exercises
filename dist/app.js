"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.get("/planets", async (request, response) => {
    //  response.send("Up and running!");
    // response.json([{ name: "Jupiter" }, { name: "Mars" }]);
    const planets = await prisma.planet.findMany();
    response.json(planets);
});
exports.default = app;
//# sourceMappingURL=app.js.map