import { UUID } from "crypto";

export class User {
    id: number;

    created_at: Date;

    uuid_user: UUID;
  
    username: string;
  
    role: string;
  
    tenantId: string;

    platform: string;

    telegram_user_id: number;
}
