import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProduitDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  name_pro!: string;

  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsString()
  @IsNotEmpty()
  img!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  prix_p!: number;

  @IsString()
  @IsNotEmpty()
  id_cat!: string;
}
