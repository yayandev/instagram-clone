import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { config } from "@/utils/cloudinary/config";
import { uploadOnePhoto } from "@/utils/cloudinary/uploadOnePhoto";
cloudinary.config(config);

export async function POST(req: NextRequest) {
  try {
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const me: any = await prisma.user.findMany({
      where: {
        email: auth.user.email,
      },
    });

    const userID = me[0].id;

    if (!userID) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    let formData = await req.formData();
    let caption = formData.get("caption");
    let images = formData.get("file");

    if (!caption || !images) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }

    const resultCloudiary = await uploadOnePhoto(formData);

    if (resultCloudiary.error) {
      return NextResponse.json({
        message: resultCloudiary.error,
        success: false,
      });
    }

    const idImage = resultCloudiary.photo?.public_id;
    const urlImage = resultCloudiary.photo?.secure_url;

    const newPost = await prisma.post.create({
      data: {
        caption: caption as string,
        images: urlImage as string,
        idImage: idImage as string,
        userID: userID,
      },
    });

    return NextResponse.json({
      message: "Success",
      success: true,
      data: newPost,
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

      const postCount = await prisma.post.count({
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
      });

      let nextPage = postCount > Number(take);

      return NextResponse.json({
        data: posts,
        nextPage: nextPage,
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
