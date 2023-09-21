import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    ("use server");
    const auth: any = await getServerSession();
    if (!auth) {
      return NextResponse.json({
        message: "unauthorized",
        success: false,
      });
    }

    const me = await prisma.user.findUnique({
      where: {
        email: auth.user.email,
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        email: true,
        bio: true,
        isVerify: true,
        _count: true,
      },
    });

    return NextResponse.json({
      data: me,
      message: "success",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
