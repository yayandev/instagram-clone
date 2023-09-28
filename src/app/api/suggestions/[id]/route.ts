import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const suggestions = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        isVerify: true,
        followedByIDs: true,
      },
      where: {
        id: {
          not: id,
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
      orderBy: {
        createdAt: "desc",
      },
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
