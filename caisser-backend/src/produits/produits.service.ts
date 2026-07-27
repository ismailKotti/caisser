import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProduitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduitDto: CreateProduitDto) {
    return this.prisma.produit.create({
      data: {
        name_pro: createProduitDto.name_pro,
        desc: createProduitDto.desc,
        img: createProduitDto.img,
        prix_p: createProduitDto.prix_p,
        id_cat: createProduitDto.id_cat,
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