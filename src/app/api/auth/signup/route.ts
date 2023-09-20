import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import bcryptjs from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, email, password } = body;

    // validasi username
    const usernameValidation = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameValidation) {
      return NextResponse.json({
        message: "Username already exists",
        success: false,
      });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
