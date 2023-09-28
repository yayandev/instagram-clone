import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const email = query.get("email");
    const id = query.get("id");
    const username = query.get("username");

    if (email && !id) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          image: true,
          idImage: true,
          username: true,
          bio: true,
          isVerify: true,
          email: true,
          _count: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return NextResponse.json({
        data: user,
        message: "success",
        success: true,
      });
    }

    if (id && !email) {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          image: true,
          idImage: true,
          username: true,
          bio: true,
          isVerify: true,
          followedByIDs: true,
          email: true,
          _count: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return NextResponse.json({
        data: user,
        message: "success",
        success: true,
      });
    }

    if (username && !email && !id) {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
          bio: true,
          isVerify: true,
          email: true,
          _count: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return NextResponse.json({
        data: user,
        message: "success",
        success: true,
      });
    }

    const take = Number(query.get("take")) || 5;
    const skip = Number(query.get("skip")) || 0;
    const auth: any = await getServerSession();
    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const me: any = await prisma.user.findUnique({
      where: {
        email: auth.user.email,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        email: {
          not: auth.user.email,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        username: true,
      },
      take: take,
      skip: skip,
    });

    return NextResponse.json({
      data: users,
      take: take,
      skip: skip,
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

export async function PUT(req: NextRequest) {
  try {
    const auth: any = await getServerSession();

    if (!auth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const body = await req.json();

    const { name, bio } = body;

    if (!name || !bio) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await prisma.user.update({
      where: {
        email: auth.user.email,
      },
      data: {
        name: name,
        bio: bio,
      },
    });

    return NextResponse.json({
      message: "Update profile successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
