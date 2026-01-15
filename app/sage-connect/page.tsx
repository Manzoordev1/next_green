export default function SageConnectPage() {
  return (
    <div style={{ padding: "50px" }}>
      <h1>Sage OAuth Test</h1>
      <a href="/api/connect">
        <button style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0072ce",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Connect to Sage
        </button>
      </a>
    </div>
  );
}
