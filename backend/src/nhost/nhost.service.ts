import { Injectable } from '@nestjs/common';
import { NhostClient } from '@nhost/nhost-js';

@Injectable()
export class NhostService {
  private nhost: NhostClient;

  constructor() {
    this.nhost = new NhostClient({
      subdomain: 'gphvbxzuxsectddpftbm',
      region: 'eu-central-1',
    });
  }

  async signIn(email: string, password: string) {
    const { session, error } = await this.nhost.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return session;
  }

  async signUp(email: string, password: string) {
    const { session, error } = await this.nhost.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return session;
  }
}
