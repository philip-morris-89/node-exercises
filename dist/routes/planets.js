"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const validation_1 = require("../lib/middleware/validation");
const passport_1 = require("../lib/middleware/passport");
const multer_1 = require("../lib/middleware/multer");
const prisma = new client_1.PrismaClient();
const upload = (0, multer_1.initMulterMiddleware)();
const router = (0, express_1.Router)();
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
router.post("/", passport_1.checkAuthorization, (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response) => {
    const planetData = request.body;
    //@ts-ignore
    const username = request.user?.username;
    const planet = await prisma.planet.create({
        data: {
            ...planetData,
            createdBy: username,
            updatedBy: username,
        },
    });
    response.json(planet);
});
// PUT
router.put("/:id", passport_1.checkAuthorization, async (request, response) => {
    const { id } = request.params;
    const { name, diameter, moons } = request.body;
    //@ts-ignore
    const username = request.user?.username;
    const planet = await prisma.planet.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            diameter,
            moons,
            updatedBy: username,
        },
    });
    response.json(planet);
});
// DELETE
router.delete("/:id", passport_1.checkAuthorization, async (request, response) => {
    const { id } = request.params;
    const planet = await prisma.planet.delete({
        where: {
            id: Number(id),
        },
    });
    response.json(planet);
});
router.post("/:id(\\d+)/photo", passport_1.checkAuthorization, upload.single("photo"), async (request, response, next) => {
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
    }
    catch (error) {
        response.status(404);
        next(`Cannot POST /planets/${planetId}/photo`);
    }
    response.status(201).json({ photoFilename });
});
router.use("/photos", express_1.default.static("uploads"));
exports.default = router;
//# sourceMappingURL=planets.js.map