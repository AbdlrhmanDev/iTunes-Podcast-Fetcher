/**
 * Podcast API Server
 * Main entry point for the podcast search and trending API
 */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import searchRoutes from './routes/search.js';
import trendingRoutes from './routes/trending.js';

// Load environment variables
dotenv.config();

// Configuration
const config = {
  port: process.env.PORT || 3002,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/podcastsDB',
  mongooseOptions: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Database connection setup
 */
const connectDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri, config.mongooseOptions);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔌 Host: ${mongoose.connection.host}`);
    console.log(`🔢 Port: ${mongoose.connection.port}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', {
      name: err.name,
      message: err.message
    });
    process.exit(1);
  }
};

/**
 * Database event handlers
 */
const setupDatabaseEventHandlers = () => {
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
  });
};

/**
 * Graceful shutdown handler
 */
const setupGracefulShutdown = () => {
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (err) {
      console.error('Error during MongoDB disconnection:', err);
      process.exit(1);
    }
  });
};

/**
 * Handle port conflicts by killing existing process
 */
const handlePortConflict = (port) => {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
      if (err) {
        reject(new Error(`Failed to find process using port: ${err.message}`));
        return;
      }

      const lines = stdout.split('\n');
      for (const line of lines) {
        if (line.includes('LISTENING')) {
          const pid = line.trim().split(/\s+/).pop();
          if (pid) {
            console.log(`Found process using port ${port} with PID: ${pid}`);
            exec(`taskkill /F /PID ${pid}`, (err) => {
              if (err) {
                reject(new Error(`Failed to kill process: ${err.message}`));
                return;
              }
              console.log(`Successfully killed process ${pid}`);
              resolve();
            });
            return;
          }
        }
      }
      reject(new Error(`Could not find process using port ${port}`));
    });
  });
};

/**
 * Start the Express server
 */
const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();
    setupDatabaseEventHandlers();
    setupGracefulShutdown();

    // Setup routes
    app.get('/', (req, res) => {
      res.json({ status: 'ok', message: '🎧 Podcast API is working!' });
    });
    app.use('/search', searchRoutes);
    app.use('/trending', trendingRoutes);

    // Start server
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running at http://localhost:${config.port}`);
    });

    // Handle server errors
    server.on('error', async (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`⚠️ Port ${config.port} is already in use. Attempting to resolve...`);
        try {
          await handlePortConflict(config.port);
          startServer(); // Restart server after killing conflicting process
        } catch (err) {
          console.error('Failed to resolve port conflict:', err.message);
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();
