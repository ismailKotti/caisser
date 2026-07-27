import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Format d email invalide' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  pass: string;

  @IsString()
  @IsNotEmpty({ message: 'L ID du rôle (ex: Caissier ou Admin) est requis' })
  roleId: string;
}
