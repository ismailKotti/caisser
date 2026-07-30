import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProduitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduitDto: CreateProduitDto) {
    let catId = createProduitDto.id_cat;
    let categorie: any = null;

    // 1. Tenter de chercher d'abord si c'est un UUID de catégorie existant
    try {
      if (catId && typeof catId === 'string' && catId.trim() !== '') {
        categorie = await this.prisma.categorie.findUnique({ where: { id_cat: catId.trim() } });
      }
    } catch (e) {
      // L'ID fourni n'est pas un UUID (ex: c'est peut-être le nom comme "Cold Drinks")
    }

    // 2. Si non trouvée par UUID, chercher par Nom de catégorie (type_cat)
    if (!categorie && catId && typeof catId === 'string') {
      categorie = await this.prisma.categorie.findFirst({
        where: {
          type_cat: {
            equals: catId.trim(),
            mode: 'insensitive'
          }
        }
      });
    }

    // 3. Si toujours introuvable en BDD, prendre la première catégorie existante
    if (!categorie) {
      categorie = await this.prisma.categorie.findFirst();
    }

    if (!categorie) {
      throw new NotFoundException("Impossible d'ajouter le produit : aucune catégorie n'existe dans la base PostgreSQL.");
    }

    return this.prisma.produit.create({
      data: {
        name_pro: createProduitDto.name_pro || "Article sans nom",
        desc: createProduitDto.desc || "Aucune description",
        img: createProduitDto.img || "",
        prix_p: Number(createProduitDto.prix_p || 0),
        id_cat: categorie.id_cat,
      },
      include: {
        categorie: true,
      },
    });
  }

  async findAll() {
    return this.prisma.produit.findMany({
      include: {
        categorie: true,
      },
    });
  }

  async findOne(id: string) {
    const produit = await this.prisma.produit.findUnique({
      where: { id_pro: id },
      include: {
        categorie: true,
      },
    });

    if (!produit) {
      throw new NotFoundException(`Produit avec l'ID "${id}" introuvable`);
    }

    return produit;
  }

  async update(id: string, updateProduitDto: UpdateProduitDto) {
    await this.findOne(id);

    return this.prisma.produit.update({
      where: { id_pro: id },
      data: updateProduitDto,
      include: {
        categorie: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.produit.delete({
      where: { id_pro: id },
    });
  }
}