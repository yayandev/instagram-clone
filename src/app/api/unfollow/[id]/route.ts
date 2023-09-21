import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // unfollow
    const unfollow = await prisma.user.update({
      where: {
        email: auth?.user?.email,
      },
      data: {
        following: {
          disconnect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json({
      message: "unfollow successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
