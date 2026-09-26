export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  is_verified: boolean;
  created_at: Date;
}

export type CreateUser = Omit<User, "id" | "created_at">;
