import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty({ message: 'L action de paiement (ex: CASH, CARD) est requise' })
  action: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  prix_f: number;
}
