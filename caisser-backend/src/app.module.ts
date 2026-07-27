import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProduitsModule } from './produits/produits.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProduitsModule,
    OrdersModule,
    RolesModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
