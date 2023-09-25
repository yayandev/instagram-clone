import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { uploadPhoto } from "@/utils/cloudinary/uploadPhoto";
import { getServerSession } from "next-auth";

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
      include: {
        user: {
          select: {
            name: true,
            image: true,
            isVerify: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
