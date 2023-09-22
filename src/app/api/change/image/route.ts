import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, idImage, idLastImage } = body;

    if (!image || !idImage || !idLastImage) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }

    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }

    const user = await prisma.user.update({
      where: {
        email: auth.user.email,
      },
      data: {
        image: image,
        idImage: idImage,
      },
    });

    if (idLastImage !== "default") {
      await cloudinary.uploader.destroy(idLastImage);
    }

    return NextResponse.json({
      message: "change image successfully!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
