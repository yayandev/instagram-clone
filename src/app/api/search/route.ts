import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { keyword, type } = body;

    if (!keyword || !type) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }

    switch (type) {
      case "posts":
        const posts = await prisma.post.findMany({
          where: {
            OR: [
              {
                caption: {
                  contains: keyword,
                },
              },
              {
                user: {
                  username: {
                    contains: keyword,
                  },
                },
              },
            ],
          },
        });
        return NextResponse.json({
          posts,
          message: "success",
          success: true,
        });
      case "users":
        const users = await prisma.user.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: keyword,
                },
              },
              {
                username: {
                  contains: keyword,
                },
              },
            ],
          },
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
            followedByIDs: true,
            isVerify: true,
          },
        });
        return NextResponse.json({
          users,
          message: "success",
          success: true,
        });
      default:
        return NextResponse.json({
          message: "Invalid type",
          success: false,
        });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
