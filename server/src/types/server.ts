export interface IServer {
  id: number;
  name: string;
  owner_id: number | null;
  icon?: string;
  created_at: Date;
}

export interface IServerMember {
  id?: number;
  server_id: number;
  user_id: number;
  joined_at?: Date;
}

export type CreateServer = Omit<IServer, "id" | "created_at">
