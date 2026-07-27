import { PrismaClient } from '@prisma/client';

try {
  const prisma1 = new PrismaClient();
  console.log('No args OK');
} catch (e) {
  console.log('No args error:', e.message);
}

try {
  const prisma2 = new PrismaClient({});
  console.log('Empty object OK');
} catch (e) {
  console.log('Empty object error:', e.message);
}

try {
  const prisma3 = new PrismaClient({ log: ['query'] });
  console.log('Log object OK');
} catch (e) {
  console.log('Log object error:', e.message);
}
