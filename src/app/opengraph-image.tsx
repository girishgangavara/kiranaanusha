import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/wedding";

/**
 * Generated share card — this is what appears when the link is pasted into
 * WhatsApp. Built at request time by Next so the file always exists and always
 * matches the names and date in wedding.ts.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${weddingConfig.groom.shortName} & ${weddingConfig.bride.shortName} — Wedding Invitation`;

export default function OpengraphImage() {
  const { groom, bride, wedding } = weddingConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg,#f8f3e8 0%,#f2e5cd 48%,#eddcc0 100%)",
          fontFamily: "Georgia, serif",
          color: "#3b2a1e",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "2px solid rgba(176,138,69,0.5)",
            borderRadius: 8,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(176,138,69,0.32)",
            borderRadius: 4,
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 22,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#8a6a2f",
            display: "flex",
          }}
        >
          With the blessings of Almighty
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 34 }}>
          <div style={{ width: 90, height: 1, background: "#b08a45", display: "flex" }} />
          {/* a rotated square rather than a glyph — no font download needed */}
          <div
            style={{
              width: 12,
              height: 12,
              background: "#b08a45",
              transform: "rotate(45deg)",
              display: "flex",
            }}
          />
          <div style={{ width: 90, height: 1, background: "#b08a45", display: "flex" }} />
        </div>

        <div style={{ fontSize: 96, marginTop: 30, display: "flex" }}>{groom.shortName}</div>
        <div style={{ fontSize: 44, color: "#b08a45", fontStyle: "italic", display: "flex" }}>&</div>
        <div style={{ fontSize: 96, display: "flex" }}>{bride.shortName}</div>

        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginTop: 34,
            color: "#6b5847",
            display: "flex",
          }}
        >
          {wedding.dayName} · {wedding.dateLabel}
        </div>

        <div style={{ fontSize: 24, marginTop: 14, color: "#6b5847", display: "flex" }}>
          {wedding.venue}
        </div>
      </div>
    ),
    size,
  );
}
