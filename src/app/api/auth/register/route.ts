import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/zod";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = RegisterSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const { email, password, name } = validatedData.data;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
