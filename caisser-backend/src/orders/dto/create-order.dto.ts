import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  id_pro: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'La quantité doit être au moins 1' })
  quantit: number;
}

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  id_user?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  order_item: OrderItemDto[];

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  prix_total: number;
}