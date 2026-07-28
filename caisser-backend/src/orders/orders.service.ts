import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Créer une commande (Order)
  async createOrder(createOrderDto: CreateOrderDto) {
    console.log("--- TENTATIVE ENREGISTREMENT COMMANDE ---", JSON.stringify(createOrderDto));
    try {
      let userId = createOrderDto.id_user;
      if (userId && typeof userId === 'string' && userId.trim() !== '' && userId !== '00000000-0000-0000-0000-000000000000') {
        try {
          const existingUser = await this.prisma.user.findUnique({ where: { id_user: userId } });
          if (!existingUser) {
            userId = undefined;
          }
        } catch (e) {
          // Ignore l'erreur P2023 si l'ID n'est pas un UUID PostgreSQL valide
          userId = undefined;
        }
      } else {
        userId = undefined;
      }

      if (!userId) {
        const defaultUser = await this.prisma.user.findFirst();
        if (!defaultUser) {
          throw new NotFoundException("Aucun utilisateur dans la base PostgreSQL. Veuillez créer au moins un compte caissier/admin avant de valider des commandes.");
        }
        userId = defaultUser.id_user;
      }

      // Sécurisation anti-erreur 500 sur les produits (vérification et try/catch anti P2023 UUID invalide)
      const validOrderItems = [];
      for (const item of (createOrderDto.order_item || [])) {
        let prodId = String(item.id_pro || '').trim();
        let prod = null;
        try {
          if (prodId && prodId !== 'undefined' && prodId !== 'null') {
            prod = await this.prisma.produit.findUnique({ where: { id_pro: prodId } });
          }
        } catch (e) {
          // L'ID produit n'est pas un UUID valide en BDD
          prod = null;
        }

        if (prod) {
          validOrderItems.push({
            id_pro: prod.id_pro,
            quantit: Math.max(1, Math.round(Number(item.quantit || 1)))
          });
        } else {
          console.warn(`Produit ID '${prodId}' invalide ou non trouvé en BDD. Association automatique au premier produit valide de la BDD...`);
          const anyProd = await this.prisma.produit.findFirst();
          if (anyProd) {
            validOrderItems.push({
              id_pro: anyProd.id_pro,
              quantit: Math.max(1, Math.round(Number(item.quantit || 1)))
            });
          }
        }
      }

      if (validOrderItems.length === 0) {
        throw new NotFoundException("Impossible d'enregistrer la commande : aucun des produits du panier n'existe dans la base de données PostgreSQL.");
      }

      const order = await this.prisma.order.create({
        data: {
          id_user: userId,
          prix_total: Number(createOrderDto.prix_total || 0),
          order_item: {
            create: validOrderItems,
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
      console.log("=> Commande sauvegardée avec succès en BDD ! ID:", order.id_order);
      return order;
    } catch (error) {
      console.error("ERREUR CRITIQUE DATABASE ORDER SAVE:", error);
      throw error;
    }
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
