import { PrismaClient as PostgresClient } from "@/generated/lib/prisma/postgres";

const prisma = {
    postgres: new PostgresClient(),
};

export default prisma;
