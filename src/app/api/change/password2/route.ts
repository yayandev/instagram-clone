import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import bcryptjs from "bcryptjs";
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, newPassword, confirmNewPassword } = body;

    if (newPassword.length < 8) {
      return NextResponse.json({
        message: "Password minimal 8 karakter",
        success: false,
      });
    }

    const user = await prisma.user.findMany({
      where: {
        token,
      },
    });

    if (user.length === 0) {
      return NextResponse.json({
        message: "Token invalid!",
        success: false,
      });
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({
        message: "Password tidak sama!",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user[0].id,
      },
      data: {
        password: hashedPassword,
        token: null,
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
