import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Créer une commande (Order)
  async createOrder(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        id_user: createOrderDto.id_user,
        prix_total: createOrderDto.prix_total,
        order_item: {
          create: createOrderDto.order_item.map((item) => ({
            id_pro: item.id_pro,
            quantit: item.quantit,
          })),
        },
      },
      include: {
        user: {
          select: { email: true, roleId: true },
        },
        order_item: {
          include: { produit: true },
        },
      },
    });
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        action: createPaymentDto.action,
        prix_f: createPaymentDto.prix_f,
      },
    });
  }

  async findAllOrders() {
    return this.prisma.order.findMany({
      orderBy: { incrementalId: 'desc' },
      include: {
        user: {
          select: { email: true },
        },
        order_item: {
          include: { produit: true },
        },
      },
    });
  }

  async findOneOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id_order: id },
      include: {
        user: true,
        order_item: {
          include: { produit: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Commande "${id}" introuvable`);
    }

    return order;
  }
}
