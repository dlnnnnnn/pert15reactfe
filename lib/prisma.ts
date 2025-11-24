import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

// Workaround to find the db file in production
const filePath = path.join(process.cwd(), 'prisma/local.db');

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'file:' + filePath,
      },
    },
  });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      datasources: {
        db: {
          url: 'file:' + filePath,
        },
      },
      log: ['query'],
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;