export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt'>>;
