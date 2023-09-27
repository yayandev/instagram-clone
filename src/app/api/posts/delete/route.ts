import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { config } from "@/utils/cloudinary/config";
cloudinary.config(config);
export async function DELETE(req: NextRequest) {
  try {
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const me: any = await prisma.user.findUnique({
      where: {
        email: auth.user.email,
      },
    });

    const userID = me.id;
    const postId = req.nextUrl.searchParams.get("post_id");
    if (!postId) {
      return NextResponse.json({
        message: "Post id is required",
        success: false,
      });
    }
    const post: any = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        success: false,
      });
    }

    if (post.userID !== userID) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    await cloudinary.uploader.destroy(post.idImage);

    // delete comments
    const deleteComment = await prisma.comment.deleteMany({
      where: {
        postID: postId,
      },
    });

    // delete likes
    const deleteLike = await prisma.like.deleteMany({
      where: {
        postID: postId,
      },
    });

    // delete post
    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({
      message: "Posts deleted successfully",
      success: true,
      data: { deleteComment, deleteLike, deletePost },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
