import express, { Application } from 'express';
import cors from 'cors';
// as a default import, can rename it as i like
import userRoutes from '../routes/user';
import db from '../db/connection';

class Server {
  // i have o declare attributes before using
  private app: Application;
  private port: string;
  private api_paths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    // initial methods
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      throw new Error('Unable to connect to the database');
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Body parse - to be able to use JSON
    this.app.use(express.json());
    // Public folder
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.api_paths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
