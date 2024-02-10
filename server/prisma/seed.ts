import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const userRole = await prisma.role.create({ data: { name: 'user' } });
  const adminRole = await prisma.role.create({ data: { name: 'admin' } });

  console.log({ userRole, adminRole });

  const otherCategory = await prisma.category.create({ data: { name: 'other' } });

  console.log({ otherCategory });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
