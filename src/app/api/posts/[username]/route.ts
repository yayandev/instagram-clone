import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;

    const posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },

      take: 5,
    });

    return NextResponse.json({
      data: posts,
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
