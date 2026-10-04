import { ImageResponse } from "next/og";
export const alt = "Seungjin Ha · Frontend Developer · J2AN";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#f4f2ed",
        color: "#191919",
        padding: "56px 65px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 23,
        }}
      >
        <span>J2AN.</span>
        <span style={{ color: "#69655f" }}>FRONTEND DEVELOPER</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 94,
          letterSpacing: -6,
          lineHeight: 1.05,
        }}
      >
        <span>Hello, I’m</span>
        <span style={{ color: "#e6532f" }}>Seungjin Ha.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #d8d5ce",
          paddingTop: 25,
          fontSize: 23,
        }}
      >
        Product Engineering · Design Systems · Performance & Craft
      </div>
    </div>,
    size,
  );
}

export const dynamic = "force-static";
