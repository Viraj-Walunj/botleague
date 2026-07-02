import { useNavigate } from "react-router-dom";

// ── Required profile fields the user must complete ────────────────────────────
export interface MissingField {
  key:   string;
  label: string;
  icon:  string;
}

interface Props {
  missingFields: MissingField[];
  action: "create a team" | "join a team";
  onClose: () => void;
}

export default function ProfileIncompleteModal({ missingFields, action, onClose }: Props) {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#18181b",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        width: "100%", maxWidth: 420,
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}>
        {/* ── Header ── */}
        <div style={{
          background: "rgba(250,71,21,0.08)",
          borderBottom: "1px solid rgba(250,71,21,0.15)",
          padding: "22px 24px 18px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.4rem", marginBottom: 8 }}>⚠️</div>
          <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#fff", fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.04em" }}>
            Complete Your Profile First
          </h2>
          <p style={{ margin: "8px 0 0", fontSize: "0.82rem", color: "#9ca3af", lineHeight: 1.5 }}>
            You need to fill in the following details before you can {action}.
          </p>
        </div>

        {/* ── Missing fields list ── */}
        <div style={{ padding: "20px 24px" }}>
          <p style={{ margin: "0 0 12px", fontSize: "0.68rem", fontWeight: 700, color: "#fa4715", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Missing information
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {missingFields.map(f => (
              <div key={f.key} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px",
                background: "rgba(248,113,113,0.06)",
                border: "1px solid rgba(248,113,113,0.18)",
                borderRadius: 10,
              }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{f.icon}</span>
                <span style={{ fontSize: "0.87rem", fontWeight: 600, color: "#f87171" }}>{f.label}</span>
                <span style={{
                  marginLeft: "auto", fontSize: "0.65rem", fontWeight: 700,
                  color: "#fa4715", background: "rgba(250,71,21,0.1)",
                  border: "1px solid rgba(250,71,21,0.2)",
                  borderRadius: 99, padding: "2px 9px",
                }}>
                  REQUIRED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer buttons ── */}
        <div style={{
          padding: "0 24px 22px",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <button
            onClick={handleGoToProfile}
            style={{
              padding: "12px",
              background: "linear-gradient(135deg,#ff4d4d,#fa4715)",
              border: "none", borderRadius: 10,
              color: "#fff", fontSize: "0.9rem", fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(250,71,21,0.3)",
            }}
          >
            Complete Profile →
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "#6b7280",
              fontSize: "0.85rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
