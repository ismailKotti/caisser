import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id_role: id },
    });

    if (!role) {
      throw new NotFoundException(`Rôle "${id}" introuvable`);
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);
    return this.prisma.role.update({
      where: { id_role: id },
      data: updateRoleDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.role.delete({
      where: { id_role: id },
    });
  }
}
