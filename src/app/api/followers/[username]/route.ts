import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;
    const followers = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        followedBy: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
            isVerify: true,
          },
        },
        _count: true,
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
