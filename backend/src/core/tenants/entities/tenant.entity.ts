import { environment } from '../../../../../frontend/src/environments/environment';
export class Tenant {
  id: number;

  created_at: Date;

  name: string;

  address: string;

  bot_token: string;

  bot_username: string;

  environment: string;
}
