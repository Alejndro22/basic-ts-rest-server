import express, { Application } from 'express';
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
    // define my routes
    this.routes();
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
