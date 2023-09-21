import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
// create suggestion for new user
export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const email = params.params[0];
    const id = params.params[1];

    const suggestions = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
      where: {
        email: {
          not: email,
        },
        AND: {
          following: {
            none: {
              id: id,
            },
          },
          followedBy: {
            none: {
              id: id,
            },
          },
        },
      },
      take: 5,
    });

    return NextResponse.json({
      data: suggestions,
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
