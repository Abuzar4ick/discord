export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  created_at?: Date;
}
