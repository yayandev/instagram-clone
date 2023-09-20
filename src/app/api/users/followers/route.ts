import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const auth: any = await getServerSession();
    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const me = auth.user;

    const followers = await prisma.user.findUnique({
      where: {
        email: me.email,
      },
      select: {
        followedByIDs: true,
        followedBy: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: followers,
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
