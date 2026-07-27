import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Cet email est déjà utilisé par un autre caissier.',
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.pass, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        pass: hashedPassword,
        roleId: createUserDto.roleId,
      },
      select: {
        id_user: true,
        email: true,
        role: { select: { type_role: true } },
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id_user: true,
        email: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id },
      select: { id_user: true, email: true, role: true },
    });
    if (!user) {
      throw new NotFoundException(`Utilisateur "#${id}" introuvable`);
    }
    return user;
  }

  async findByEmailForAuth(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id_user: true,
        email: true,
        pass: true,
        role: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id_user: id } });
  }
}
