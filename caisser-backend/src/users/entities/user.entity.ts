import { Role, User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id_user: string;
  email: string;
  pass: string;
  roleId: string;
  role: Role;
  createdAt: Date;
}
