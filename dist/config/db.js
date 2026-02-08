"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = __importDefault(require("knex"));
const env_1 = require("./env");
const knexConfig = {
    client: 'pg',
    connection: env_1.env.DATABASE_URL,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: './migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './seeds',
        extension: 'ts',
    },
};
exports.db = (0, knex_1.default)(knexConfig);
exports.default = exports.db;
//# sourceMappingURL=db.js.map