import { Request, Response } from 'express';
import { UserCollection } from '../repository/userCollection';
import { UpdateUserData } from '../entities/user';

export class UserController {
  private userCollection: UserCollection;

  constructor() {
    this.userCollection = new UserCollection();
  }

  getUserProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const user = await this.userCollection.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  updateUserProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const updateData: UpdateUserData = req.body;
      const updatedUser = await this.userCollection.update(userId, updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
