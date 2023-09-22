import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, newPassword, confirmNewPassword } = body;

    const auth = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const me = await prisma.user.findUnique({
      where: {
        email: auth?.user?.email as string,
      },
    });

    const isMatch = await bcryptjs.compare(password, me?.password as string);

    if (!isMatch) {
      return NextResponse.json({
        message: "Kata sandi salah!",
        success: false,
      });
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({
        message: "Konfirmasi kata sandi baru tidak sesuai!",
        success: false,
      });
    }

    const isMatch2 = await bcryptjs.compare(
      newPassword,
      me?.password as string
    );

    if (isMatch2) {
      return NextResponse.json({
        message: "Kata sandi baru tidak boleh sama dengan kata sandi lama!",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        email: auth?.user?.email as string,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Password berhasil diubah!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
