import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategorieDto: CreateCategorieDto) {
    return this.prisma.categorie.create({
      data: createCategorieDto,
    });
  }

  async findAll() {
    return this.prisma.categorie.findMany({
      include: {
        produits: true,
      },
    });
  }

  async findOne(id: string) {
    const categorie = await this.prisma.categorie.findUnique({
      where: { id_cat: id },
      include: {
        produits: true,
      },
    });

    if (!categorie) {
      throw new NotFoundException(`Catégorie avec l'ID "${id}" introuvable`);
    }

    return categorie;
  }

  async update(id: string, updateCategorieDto: UpdateCategorieDto) {
    await this.findOne(id);

    return this.prisma.categorie.update({
      where: { id_cat: id },
      data: updateCategorieDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.categorie.delete({
      where: { id_cat: id },
    });
  }
}