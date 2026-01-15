// lib/api.ts
export async function fetchApi<T>(endpoint: string, p0: { signal: AbortSignal; }): Promise<T> {
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}: ${res.status}`);
  }

  const data: T = await res.json();
  return data;
}
