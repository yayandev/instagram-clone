import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import bcryptjs from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, email, password } = body;

    if (!name || !username || !email || !password) {
      return NextResponse.json({
        message: "Form data tidak boleh kosong",
        success: false,
      });
    }

    if (username.length < 4) {
      return NextResponse.json({
        message: "Username minimal 4 karakter",
        success: false,
      });
    }

    if (password.length === 0) {
      return NextResponse.json({
        message: "Password tidak boleh kosong",
        success: false,
      });
    }

    if (name.length === 0) {
      return NextResponse.json({
        message: "Nama tidak boleh kosong",
        success: false,
      });
    }

    if (email.length === 0) {
      return NextResponse.json({
        message: "Email tidak boleh kosong",
        success: false,
      });
    }

    if (password.length < 8) {
      return NextResponse.json({
        message: "Password minimal 8 karakter",
        success: false,
      });
    }

    // rubah menjadi lowercase
    const ValidUsername = username.toLocaleLowerCase();

    if (ValidUsername.includes(" ")) {
      return NextResponse.json({
        message: "Username tidak boleh mengandung spasi!",
        success: false,
      });
    }

    const usernameValidation = await prisma.user.findUnique({
      where: {
        username: ValidUsername,
      },
    });

    if (usernameValidation) {
      return NextResponse.json({
        message: "Username already exists",
        success: false,
      });
    }

    // validasi email
    const emailValidation = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailValidation) {
      return NextResponse.json({
        message: "Email sudah digunakan",
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
