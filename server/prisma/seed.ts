import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

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

  const user = await prisma.user.create({
    data: { username: 'First', email: 'first@mail.com', password: await hash('password', 8) },
  });

  for (let i = 0; i < 30; i++) {
    await prisma.lot.create({
      data: {
        name: `Lot #${i}`,
        startBid: randomInt(100, 500),
        minPitch: randomInt(1, 50),
        closesAt: new Date('2024-02-17'),
        sellerId: user.id,
        categories: {
          create: [
            { category: { connect: { name: categories[0] } } },
            { category: { connect: { name: categories[1] } } },
            { category: { connect: { name: categories[2] } } },
            { category: { connect: { name: categories[3] } } },
          ],
        },
      },
    });
    shuffle(categories);
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
