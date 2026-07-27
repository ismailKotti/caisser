import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'Le type de rôle (ex: Caissier ou Admin) est requis' })
  type_role: string;
}
