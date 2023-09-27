import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  try {
    const userID = params.userid;

    const posts = await prisma.post.findMany({
      where: {
        userID: userID as string,
      },
      select: {
        id: true,
        caption: true,
        images: true,
        userID: true,
        _count: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            isVerify: true,
            username: true,
          },
        },
        likes: {
          select: {
            userID: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
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
