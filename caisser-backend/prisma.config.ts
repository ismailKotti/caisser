import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // We pass DIRECT_URL here so Prisma Studio and CLI commands work without pooler issues!
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});