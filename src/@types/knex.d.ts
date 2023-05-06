import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    avatar_url: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
  }

  export interface Tables {
    users: User;
  }
}
