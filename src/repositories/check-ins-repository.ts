import { CheckIn, Prisma } from "@prisma/client";
import { CollectLineNumbers } from "vitest";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByUserId(userId: string): Promise<number>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}