import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const ADMIN_USER = Object.freeze({
  name: 'admin',
  login: 'admin',
  password: 'admin',
});

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      ...ADMIN_USER,
      password: hashSync(ADMIN_USER.password, 10),
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
