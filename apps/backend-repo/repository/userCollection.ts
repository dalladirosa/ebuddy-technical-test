import * as admin from 'firebase-admin';
import { User, UpdateUserData } from '../entities/user';

export class UserCollection {
  private collection: admin.firestore.CollectionReference;

  constructor() {
    this.collection = admin.firestore().collection('users');
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data?.createdAt.toDate(),
      updatedAt: data?.updatedAt.toDate()
    } as User;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const docRef = this.collection.doc();
    const userData = {
      ...user,
      id: docRef.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await docRef.set(userData);
    return userData;
  }

  async update(id: string, userData: UpdateUserData): Promise<User | null> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    const updateData = {
      ...userData,
      updatedAt: new Date()
    };

    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const data = updatedDoc.data();
    return {
      ...data,
      id: updatedDoc.id,
      createdAt: data?.createdAt.toDate(),
      updatedAt: data?.updatedAt.toDate()
    } as User;
  }
}
