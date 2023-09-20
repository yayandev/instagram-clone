import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const auth: any = await getServerSession();
    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const users = (
      await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
          createdAt: true,
          updatedAt: true,
          isVerify: true,
          email: true,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      })
    ).filter((user) => user.email !== auth.user.email);

    return NextResponse.json({
      data: users,
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
