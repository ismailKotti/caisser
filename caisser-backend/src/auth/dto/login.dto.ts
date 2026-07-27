import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "Format d'email invalide" })
  @IsNotEmpty({ message: "L'email est requis" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  pass!: string;
}
