import { PartialType } from '@nestjs/mapped-types';
import { CreateGlovoDto } from './create-glovo.dto';

export class UpdateGlovoDto extends PartialType(CreateGlovoDto) {}
