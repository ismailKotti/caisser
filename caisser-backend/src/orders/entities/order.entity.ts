import { Order as PrismaOrder, User, OrderItem } from '@prisma/client';

export class Order implements PrismaOrder {
  id_order: string;
  incrementalId: number;
  id_user: string;
  user?: User;
  order_item?: OrderItem[];
  prix_total: number;
  createdAt: Date;
  updatedAt: Date;
}
