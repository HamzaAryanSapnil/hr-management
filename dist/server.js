"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = __importDefault(require("./config/db"));
let server;
async function bootstrap() {
    try {
        await db_1.default.raw('SELECT 1');
        console.log('🛢️ Database connected successfully');
        server = app_1.default.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server is running on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
process.on('unhandledRejection', (err) => {
    console.error('🚨 Unhandled Rejection:', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('uncaughtException', (err) => {
    console.error('🚨 Uncaught Exception:', err);
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    if (server) {
        server.close(() => {
            console.log('💤 Process terminated');
        });
    }
});
bootstrap();
//# sourceMappingURL=server.js.map