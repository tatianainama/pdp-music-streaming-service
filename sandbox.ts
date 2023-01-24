import { PrismaClient } from '@prisma/client'
import useAccelerate from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(useAccelerate);

const main = async () => {
  const albums = await prisma.album.findMany({
    where: {
      name: {
        contains: 'a',
      },
    },
    // cacheStrategy: {
    //   swr: 60,
    //   ttl: 10,
    // },
  });

  console.log('Albums that have more than 1 word: ', albums);
};

main()
  .catch((e) => console.error('Error in Prisma Client query: ', e))
  .finally(async () => await prisma.$disconnect())