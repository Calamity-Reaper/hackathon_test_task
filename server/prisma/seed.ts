import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const roles = ['user', 'admin'];

  for (const r of roles) {
    await prisma.role.create({ data: { name: r } });
  }

  const categories = [
    'other',
    'animals',
    'real estate',
    'creativity',
    'clothes',
    'transport',
    'collection',
    'electronics',
    'literature',
    'dishes',
    'rarity',
    "children's world",
    'items for home and garden',
    "author's",
  ];

  for (const c of categories) {
    await prisma.category.create({ data: { name: c } });
  }
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
