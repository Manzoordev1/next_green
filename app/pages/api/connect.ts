import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Missing code" });

  try {
    const params = new URLSearchParams();
    params.append("client_id", process.env.SAGE_CLIENT_ID!);
    params.append("client_secret", process.env.SAGE_CLIENT_SECRET!);
    params.append("redirect_uri", process.env.SAGE_REDIRECT_URI!);
    params.append("grant_type", "authorization_code");
    params.append("code", code as string);

    const response = await axios.post(
      "https://oauth.accounting.sage.com/token",
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
}
