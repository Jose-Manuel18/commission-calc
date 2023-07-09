import { prisma } from "../src/lib/prisma"

async function main() {
  const response = await Promise.all([
    prisma.user.create({
      data: {
        name: "Guillermo Rauch",
        email: "rauchg@vercel.com",
        password: "12345678",
      },
    }),
    prisma.user.create({
      data: {
        name: "Lee Robinson",
        email: "lee@vercel.com",
        password: "12345678",
        employee: {
          create: [
            {
              name: "Juanita",
              commission: 0.1,
              pay: 1000,
            },
          ],
        },
      },
    }),
    await prisma.user.create({
      data: {
        name: "Steven Tey",
        email: "stey@vercel.com",
        password: "12345678",
      },
    }),
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
