import bcrypt from 'bcryptjs'
import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'
import {User} from "@prisma/client";

export const createUser = async (user: RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash,
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department,

        },
    })
    return { id: newUser.id, email: user.email }
}

export const getOtherUsers = async (userId: number) => {
    return prisma.user.findMany({
        where: {
            id: { not: userId },
        },
        orderBy: {
                firstName: 'asc',
        },
    })
}

// @ts-ignore
export const getUserById = async (userId: number) => {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}

export const updateUser = async (userId: number, user: Partial<User>) => {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            department: user.department,
        },
    });
};

export const updateProfilePicture = async (userId: number, profilePicture: string) => {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            profilePicture: profilePicture,
        },
    });
}