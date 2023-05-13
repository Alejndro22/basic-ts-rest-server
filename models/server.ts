import express, { Application } from 'express';
import cors from 'cors';
// as a default import, can rename it as i like
import userRoutes from '../routes/user';

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
    this.middlewares();
    this.routes();
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
