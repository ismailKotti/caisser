import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsNotEmpty({ message: 'L image est obligatoire' })
  img: string;

  @IsString()
  @IsNotEmpty({ message: 'Le nom de la catégorie ne peut pas être vide' })
  type_cat: string;
}