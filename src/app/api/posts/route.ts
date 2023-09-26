import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { uploadPhoto } from "@/utils/cloudinary/uploadPhoto";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { config } from "@/utils/cloudinary/config";
cloudinary.config(config);

export async function POST(req: NextRequest) {
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

  try {
    const formData = await req.formData();

    const caption = formData.get("caption");

    if (!caption) {
      return NextResponse.json({
        message: "Caption is required",
        success: false,
      });
    }

    const files = formData.get("files");

    if (!files) {
      return NextResponse.json({
        message: "File is required",
        success: false,
      });
    }

    const imagesUploadToCloudinary = await uploadPhoto(formData);

    const images = imagesUploadToCloudinary.photos;

    const newPost = await prisma.post.create({
      data: {
        caption: caption as string,
        images: [JSON.stringify(images)],
        userID,
      },
    });

    return NextResponse.json({
      data: newPost,
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

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("post_id");
    if (!postId) {
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

      const take = req.nextUrl.searchParams.get("take") || 5;

      const userID = me.id;

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              userID: {
                in: me?.followingIDs,
              },
            },
            {
              userID: userID,
            },
          ],
        },
        select: {
          id: true,
          caption: true,
          images: true,
          userID: true,
          _count: true,
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
        take: Number(take),
      });

      return NextResponse.json({
        data: posts,
        message: "success",
        success: true,
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        caption: true,
        images: true,
        userID: true,
        _count: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            isVerify: true,
            username: true,
          },
        },
        createdAt: true,
      },
    });

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

export async function DELETE(req: NextRequest) {
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
  try {
    const postId = req.nextUrl.searchParams.get("post_id");
    if (!postId) {
      return NextResponse.json({
        message: "Post id is required",
        success: false,
      });
    }
    const post: any = await prisma.post.findUnique({
      where: {
        id: postId!,
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

    let images = JSON.parse(post.images);

    let public_id = [];

    for (let i = 0; i < images.length; i++) {
      public_id.push(images[i].public_id);
    }

    let res;

    if (public_id.length > 1) {
      res = await cloudinary.api.delete_resources(public_id);
      if (res.success === false) {
        return NextResponse.json({
          message: "cloudinary error",
          success: false,
        });
      }
    } else {
      res = await cloudinary.uploader.destroy(public_id[0]);
      if (res.success === false) {
        return NextResponse.json({
          message: "cloudinary error",
          success: false,
        });
      }
    }

    // delete comments
    await prisma.comment.deleteMany({
      where: {
        postID: postId!,
      },
    });

    await prisma.post.delete({
      where: {
        id: postId!,
      },
    });

    return NextResponse.json({
      message: "Posts deleted successfully",
      success: true,
      res,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
