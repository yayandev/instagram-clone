import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        idImage: true,
        isVerify: true,
        createdAt: true,
        updatedAt: true,
        followedByIDs: true,
        followingIDs: true,
        bio: true,
        _count: true,
      },
    });

    return NextResponse.json({
      data: user,
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
