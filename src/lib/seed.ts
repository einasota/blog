import { prisma } from "./prisma";

async function createAdmin() {
    const admin = await prisma.user.upsert({
        where: {
            email: "einasota@gmail.com",
        },
        update: {},
        create: {
            name: "Jhonata Souza",
            email: "einasota@gmail.com",
            pass: "",
            role: "admin"
        }
    })
    console.log(admin)
}
createAdmin()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (event) => {
        console.error(event)
        await prisma.$disconnect()
        process.exit(1)
    })