export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string | null;
  password: string;
  emailVerified?: boolean;
  phoneNumber?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateUserData = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'password' | 'email'
>;

export type GetUserData = Omit<User, 'password'>;

export type CreateUserData = Pick<User, 'email' | 'password'> & {
  confirmPassword: string;
};
