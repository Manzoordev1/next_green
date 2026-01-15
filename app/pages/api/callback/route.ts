import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  try {
    const params = new URLSearchParams();
    params.append("client_id", process.env.SAGE_CLIENT_ID!);
    params.append("client_secret", process.env.SAGE_CLIENT_SECRET!);
    params.append("redirect_uri", process.env.SAGE_REDIRECT_URI!);
    params.append("grant_type", "authorization_code");
    params.append("code", code);

    const response = await axios.post(
      "https://oauth.accounting.sage.com/token",
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.response?.data || err.message }, { status: 500 });
  }
}
