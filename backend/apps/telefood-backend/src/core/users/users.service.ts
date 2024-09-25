import { Global, Injectable } from '@nestjs/common';
import { User } from '@shared/entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { SupabaseService } from '../../utils/supabase.service';
import { CreateTgUserDto } from './dto/create-user.dto';

@Global()
@Injectable()
export class UsersService {

  constructor(private readonly SupabaseService: SupabaseService){ }

  async create(userToCreate: CreateTgUserDto): Promise<CreateTgUserDto | null> {
    try {
        const { data, error } = await this.SupabaseService.getClient().from('Users').insert(userToCreate).select().single();

        if (error) {
            throw error;
        }
        console.log("User created.", data)

        return data;
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
    const { data, error } = await this.SupabaseService.getClient().from('Users')
      .select('*')
      .eq('telegram_user_id', telegramUserId)
      .eq('tenant_id', tenantId)
      .single();
  
      let userObj: User;

      if (error) {
        throw error;
      } else if(data) {
        userObj = plainToInstance(User, data);
      }

    return userObj;
  }
  
}
