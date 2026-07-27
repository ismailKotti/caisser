import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        action: createPaymentDto.action,
        prix_f: createPaymentDto.prix_f,
      },
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id_pay: id },
    });

    if (!payment) {
      throw new NotFoundException(`Paiement "${id}" introuvable`);
    }

    return payment;
  }
}
