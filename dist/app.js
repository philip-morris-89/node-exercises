"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = require("./lib/middleware/cors");
const session_1 = require("./lib/middleware/session");
const passport_1 = require("./lib/middleware/passport");
const planets_1 = __importDefault(require("./routes/planets"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, session_1.initSessionMiddleware)());
app.use(passport_1.passport.initialize());
app.use(passport_1.passport.session());
app.use(express_1.default.json());
app.use("/planets", planets_1.default);
app.use("/auth", auth_1.default);
app.use(cors_1.initCorsMiddleware);
app.listen(3000, () => {
    console.log("Running on port", 3000);
});
exports.default = app;
//# sourceMappingURL=app.js.map