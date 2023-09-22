import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { newUsername } = body;

    if (newUsername.length < 4) {
      return NextResponse.json({
        message: "Username minimal 4 karakter",
        success: false,
      });
    }

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

    if (me?.username === newUsername) {
      return NextResponse.json({
        message: "Anda sudah menggunakan username ini",
        success: false,
      });
    }

    const users = await prisma.user.findMany({
      where: {
        username: newUsername,
      },
    });

    if (users.length > 0) {
      return NextResponse.json({
        message: "Username sudah digunakan",
        success: false,
      });
    }

    const updateUsername = await prisma.user.update({
      where: {
        email: auth?.user?.email as string,
      },
      data: {
        username: newUsername,
      },
    });

    return NextResponse.json({
      message: "Username berhasil diganti",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
