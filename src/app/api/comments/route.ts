import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const postID = req.nextUrl.searchParams.get("post_id");
    const take = req.nextUrl.searchParams.get("take") || 10;

    if (!postID) {
      return NextResponse.json({
        message: "Post id is required",
        success: false,
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postID: postID!,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: Number(take),
    });

    return NextResponse.json({
      data: comments,
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

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const me: any = await prisma.user.findUnique({
      where: {
        email: auth?.user?.email!,
      },
    });

    if (!me) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const userID = me.id;

    const body = await req.json();

    const { postID, comment } = body;

    if (!postID || !comment) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postID!,
      },
    });

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        success: false,
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        userID: userID,
        postID: postID!,
        comment: comment,
      },
    });

    return NextResponse.json({
      data: newComment,
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
