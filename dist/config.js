"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSetting = "Warning: No value set for this environment variable";
const config = {
    PORT: process.env.PORT || missingSetting,
    SESSION_SECRET: process.env.SESSION_SECRET || missingSetting,
    GITHUB_CLIED_ID: process.env.GITHUB_CLIED_ID || missingSetting,
    GITHUB_CLIED_SECRET: process.env.GITHUB_CLIED_SECRET || missingSetting,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || missingSetting,
};
exports.default = config;
//# sourceMappingURL=config.js.map