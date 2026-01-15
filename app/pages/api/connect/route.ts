import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SAGE_CLIENT_ID;
  const redirectUri = process.env.SAGE_REDIRECT_URI;

  const authUrl = `https://www.sage.com/oauth2/auth?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=full_access`;

  return NextResponse.redirect(authUrl);
}
