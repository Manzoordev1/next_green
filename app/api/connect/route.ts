import { NextResponse } from "next/server";

export async function GET() {
  const authUrl =
    "https://oauth.accounting.sage.com/authorize" +
    `?client_id=${process.env.SAGE_CLIENT_ID}` +
    "&response_type=code" +
    "&scope=full_access" +
    `&redirect_uri=${encodeURIComponent(
      process.env.SAGE_REDIRECT_URI!
    )}`;

  console.log("AUTH URL:", authUrl);

  return NextResponse.redirect(authUrl);
}
