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

  export interface Meal {
    id: string;
    name: string;
    description: string;
    eated_at: string;
    on_the_diet: boolean;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;

    user_id: string;
  }

  export interface Tables {
    users: User;
    meals: Meal;
  }
}
