import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProduitDto {
  @IsString()
  @IsOptional()
  name_pro?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  img?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  @IsOptional()
  prix_p?: number;

  @IsString()
  @IsOptional()
  id_cat?: string;
}
