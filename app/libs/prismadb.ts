import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
async function testConnection() {
    try {
        await client.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
}

if (process.env.NODE_ENV === 'development') {
    testConnection();
}
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;