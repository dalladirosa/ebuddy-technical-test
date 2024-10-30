import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeFirebase } from '../config/firebaseConfig';
import { userRoutes } from '../routes/userRoutes';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeFirebase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeFirebase() {
    initializeFirebase();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/api/users', userRoutes);
  }

  public listen() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default App;
