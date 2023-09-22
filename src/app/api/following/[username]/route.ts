import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;
    const following = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        _count: true,
      },
    });
    return NextResponse.json({
      data: following,
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
