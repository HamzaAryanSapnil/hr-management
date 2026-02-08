/* eslint-disable no-undef */
import { Server } from 'http';
import app from './app';
import { env } from './config/env';
import db from './config/db';

let server: Server;

async function bootstrap() {
  try {
    
    await db.raw('SELECT 1');
    console.log('🛢️ Database connected successfully');

    server = app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}


process.on('unhandledRejection', (err: unknown) => {
  console.error('🚨 Unhandled Rejection:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err: unknown) => {
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