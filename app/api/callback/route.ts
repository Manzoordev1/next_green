import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("CALLBACK HIT");

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  console.log("AUTH CODE:", code);

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    code,
  });
}
