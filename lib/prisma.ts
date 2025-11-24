import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

// Debug: Log the paths to see where it's looking
const cwd = process.cwd();
const dbPath = path.join(cwd, 'prisma/dev.db');

console.log('Current working directory:', cwd);
console.log('Looking for database at:', dbPath);
console.log('Database file exists:', fs.existsSync(dbPath));
console.log('DATABASE_URL:', process.env.DATABASE_URL);

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ['query'],
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;