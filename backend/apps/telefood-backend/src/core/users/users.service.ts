import { Global, Injectable } from '@nestjs/common';
import { CreateTgUserDto } from '../telegram/dto/create-tg-user.dto';
import { User } from '@shared/entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { SupabaseService } from '../../utils/supabase.service';

@Global()
@Injectable()
export class UsersService {

  constructor(private readonly SupabaseService: SupabaseService){ }

  async create(userToCreate: CreateTgUserDto): Promise<CreateTgUserDto | null> {
    try {
      const { data, error } = await this.SupabaseService.getClient().from('Users').insert(userToCreate);

      if (error) {
        throw error;
      }

      return userToCreate;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  //update(id: number, updateUserDto: UpdateUserDto) {
  //  return `This action updates a #${id} user`;
  //}

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // This function checks if there is an association in table public.users and if present returns the object
  async checkUserExistence(telegramUserId: number, tenantId: number): Promise<User> {
    const spUser = await this.SupabaseService.getClient().from('Users')
      .select('*')
      .eq('telegram_user_id', telegramUserId)
      .eq('tenant_id', tenantId)
      .single();
  
    return plainToInstance(User, spUser?.[0] ?? null);
  }
  
}
