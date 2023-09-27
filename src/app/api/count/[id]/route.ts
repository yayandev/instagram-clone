import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;

    const post = await prisma.post.findUnique({
      where: {
        id: postId!,
      },
      select: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: {
          select: {
            userID: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        success: false,
      });
    }

    return NextResponse.json({
      data: post,
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
