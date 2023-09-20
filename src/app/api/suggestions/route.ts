import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";
// create suggestion for new user
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    // ambil data take dan skip dari url query
    const skip = Number(query.get("skip")) || 0;
    const take = Number(query.get("take")) || 5;
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const me = auth.user;
    const suggestions = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
      where: {
        email: {
          not: me.email,
        },
        AND: {
          following: {
            none: {
              id: me.id,
            },
          },
          followedBy: {
            none: {
              id: me.id,
            },
          },
        },
      },
      take: take,
      skip: skip,
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
