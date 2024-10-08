import { prisma } from './prisma.server'
import { KudoStyle } from '@prisma/client'

export const createKudo = async (message: string, userId: number, recipientId: number, style: { id?: number; backgroundColor: string; textColor: string; emoji: string }) => {
    await prisma.kudo.create({
        data: {
            message,
            style: {
                connectOrCreate: {
                    where: { id: style.id || 0 },
                    create: {
                        backgroundColor: style.backgroundColor,
                        textColor: style.textColor,
                        emoji: style.emoji,
                    },
                },
            },
            author: {
                connect: {
                    id: userId,
                },
            },
            recipient: {
                connect: {
                    id: recipientId,
                },
            },
        },
    });
}
