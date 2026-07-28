import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.createOrder(createOrderDto);
    } catch (error: any) {
      console.error("Erreur dans OrdersController.createOrder:", error);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message || "Erreur lors du traitement de la commande",
        details: error.meta || error.code || error.toString()
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('pay')
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.ordersService.createPayment(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneOrder(id);
  }
}
