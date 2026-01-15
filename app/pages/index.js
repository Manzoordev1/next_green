export default function Home() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Sage OAuth Test</h1>
      <a href="/api/connect">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Connect to Sage</button>
      </a>
    </div>
  );
}
