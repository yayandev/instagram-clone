import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { user }: any = await getServerSession();

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const validationMyFollowing = await prisma.user.findUnique({
      where: {
        email: user.email,
        AND: {
          following: {
            some: {
              id: id,
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        following: true,
        followingIDs: true,
      },
    });

    if (validationMyFollowing) {
      return NextResponse.json({
        message: "You already follow this user",
        success: false,
      });
    }

    const addFollowing = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        following: {
          connect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json({
      message: "following successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
