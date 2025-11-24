// // import { PrismaClient } from "@prisma/client";

// // const globalForPrisma =
// //     globalThis as unknown as { prisma: PrismaClient };

// // export const prisma =
// //     globalForPrisma.prisma ?? new PrismaClient({
// //         log: ["query"],
// //     });

// // if (process.env.NODE_ENV !== "production")
// //     globalForPrisma.prisma = prisma;

// import { PrismaClient } from '@prisma/client';
// import path from 'path';

// declare global {
//   // eslint-disable-next-line no-var
//   var cachedPrisma: PrismaClient;
// }

// // Workaround to find the db file in production
// const filePath = path.join(process.cwd(), 'prisma/dev.db');
// const config = {
//   datasources: {
//     db: {
//       url: 'file:' + filePath,
//     },
//   },
// };

// let prisma: PrismaClient;
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient(config);
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient(config);
//   }
//   prisma = global.cachedPrisma;
// }

// export const db = prisma;

import { PrismaClient } from '@prisma/client';
import path from 'path';

// Extend global type so Prisma doesn't get recreated in dev
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Absolute file path to SQLite database
const dbPath = path.join(process.cwd(), 'prisma/dev.db');

const prismaConfig = {
  datasources: {
    db: {
      url: 'file:' + dbPath,
    },
  },
};

// Use cached client in development; new client in production
const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient(prismaConfig)
    : global.prisma ?? new PrismaClient(prismaConfig);

// Cache the client in dev
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export const db = prisma;
