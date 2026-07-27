import { Role, User } from '@prisma/client';

export class Auth {
  token: string;
  user: User & { role: Role };
}
