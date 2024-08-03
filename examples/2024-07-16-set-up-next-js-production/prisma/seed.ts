import { exit } from 'node:process';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

const prettyPrint = (object: any) =>
  console.log(JSON.stringify(object, undefined, 2));

async function seed() {
  const user = await prisma.userProfile.create({
    data: {
      email: 'jan@reactsquad.io',
      name: 'Jan Hesters',
      acceptedTermsAndConditions: true,
    },
  });

  console.log('========= 🌱 result of seed: =========');
  prettyPrint({ user });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    exit(1);
  });
