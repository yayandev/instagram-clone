import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_TOKEN);

const rand = function () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

const getToken = function () {
  return rand() + rand(); // to make it longer
};

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({
      message:
        "Fitur ini sedang dalam pengembangan, silahkan coba beberapa saat lagi!",
      success: false,
    });

    const body = await req.json();
    const { email } = body;

    const token = getToken();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Email tidak terdaftar!",
        success: false,
      });
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });

    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset password",
      html: `<a href="${process.env.DOMAIN}/reset-password/${token}">Reset Password</a>`,
    });

    return NextResponse.json({
      message: "Link has been sent to your email",
      data: res,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
