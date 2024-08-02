import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty({ message: 'Tenant name is required' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'Tenant identifier is required' })
  readonly identifier: string;

  getName() {
    return this.name;
  }
}
