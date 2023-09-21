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

    const data = await prisma.user.aggregate({
      _count: {
        followedByIDs: true,
        followingIDs: true,
      },
      where: {
        email: me.email,
      },
    });

    return NextResponse.json({
      data,
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
