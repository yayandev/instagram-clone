import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("post_id");

    if (!postId) {
      return NextResponse.json({
        message: "Post id is required",
        success: false,
      });
    }

    const likes = await prisma.like.findMany({
      where: {
        postID: postId!,
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
    });

    return NextResponse.json({
      data: likes,
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
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const me = await prisma.user.findUnique({
      where: {
        email: auth?.user?.email,
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

    const { postID } = body;

    if (!postID) {
      return NextResponse.json({
        message: "Post id is required",
        success: false,
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postID,
      },
    });

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        success: false,
      });
    }

    const likes = await prisma.like.findMany({
      where: {
        userID: userID,
        AND: {
          postID: postID,
        },
      },
    });

    if (likes.length > 0) {
      return NextResponse.json({
        message: "You already liked this post",
        success: false,
      });
    }

    const newLike = await prisma.like.create({
      data: {
        userID: userID,
        postID: postID,
      },
    });

    return NextResponse.json({
      data: newLike,
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

export async function DELETE(req: NextRequest) {
  try {
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const me = await prisma.user.findUnique({
      where: {
        email: auth?.user?.email,
      },
    });

    if (!me) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const userID: any = me.id;

    const postID: any = req.nextUrl.searchParams.get("post_id");

    if (!postID) {
      return NextResponse.json({
        message: "Post id is required",
        success: false,
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postID,
      },
    });

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        success: false,
      });
    }

    // const likes = await prisma.like.findMany({
    //   where: {
    //     userID: userID,
    //     AND: {
    //       postID: postID,
    //     },
    //   },
    // })

    // delete like
    await prisma.like.deleteMany({
      where: {
        userID: userID,
        AND: {
          postID: postID,
        },
      },
    });

    return NextResponse.json({
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
