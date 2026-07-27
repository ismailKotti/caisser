import { Produit as PrismaProduit, Categorie } from '@prisma/client';

export class Produit implements PrismaProduit {
  id_pro: string;
  name_pro: string;
  desc: string;
  img: string;
  prix_p: number;
  id_cat: string;
  categorie: Categorie;
  createdAt: Date;
}
