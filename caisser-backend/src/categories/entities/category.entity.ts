import { Categorie as PrismaCategorie } from '@prisma/client';

export class Category implements PrismaCategorie {
  id_cat: string;
  img: string;
  type_cat: string;
  createdAt: Date;
  produits: PrismaCategorie[];
}
