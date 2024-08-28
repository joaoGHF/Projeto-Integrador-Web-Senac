import { prisma } from "@/db";
import { use } from "react";

export async function createUser(_name: string, _username: string, _email: string, _cpf:string, _password: string) {
    const user = await prisma.user.create({
        data: {
            name: _name,
            username: _username,
            email: _email,
            cpf: _cpf,
            password: _password
        }
    });
    return user;
}

export async function findUserByEmail(_email:string) {
    const user = await prisma.user.findUnique({
        where: {
            email: _email
        }
    });

    return user;
}

export async function findUserByUsername(_username:string) {
    const user = await prisma.user.findUnique({
        where: {
            username: _username
        }
    });

    return user;
}

export async function findUserByCPF(_cpf:string) {
    const user = await prisma.user.findUnique({
        where: {
            cpf: _cpf
        }
    });

    return user;
}

export async function findUserlogin(_username:string, _password:string) {
    const user = await prisma.user.findUnique({
        where: {
            username: _username,
            password: _password
        }
    });

    return user;
}