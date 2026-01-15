// app/sage-api/page.tsx
import SageApiTable from "./../components/sage-api/SageApiTable";

async function getSageApiModules() {
  const res = await fetch(
    "https://developer.sage.com/accounting/files/swagger.full.json",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
        "Referer": "https://developer.sage.com/accounting/",
      },
      next: { revalidate: 3600 }, // Optional: cache for 1 hour
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Sage API: ${res.status}`);
  }

  const data = await res.json();
  return data.tags;
}

export default async function SageApiPage() {
  let modules = [];

  try {
    modules = await getSageApiModules();
  } catch (err: any) {
    return <p>Error: {err.message}</p>;
  }

  return (
    <div>
      <h1>Sage Accounting API Modules</h1>
      <SageApiTable data={modules} />
    </div>
  );
}
