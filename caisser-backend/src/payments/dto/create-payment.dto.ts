import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  action?: string;

  @IsString()
  @IsOptional()
  raison?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  prix_f?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  montant?: number;

  @IsString()
  @IsOptional()
  date?: string;
}
