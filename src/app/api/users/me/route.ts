import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const auth: any = await getServerSession();
    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
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
        isVerify: true,
        followedByIDs: true,
        followingIDs: true,
        following: true,
        followedBy: true,
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
