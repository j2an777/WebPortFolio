import { ImageResponse } from "next/og";
import { getProject } from "@/content/portfolio";
export const alt = "J2AN · Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#191919",
        color: "#f4f2ed",
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
        <span style={{ color: "#e6532f" }}>J2AN.</span>
        <span>SEUNGJIN HA / CASE STUDY</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
        <span style={{ fontSize: 22, color: "#c7c3ba" }}>
          {project?.category || "PROJECT"}
        </span>
        <span style={{ fontSize: 83, letterSpacing: -4, lineHeight: 1.05 }}>
          {project?.name || "Portfolio"}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #484641",
          paddingTop: 25,
          fontSize: 22,
        }}
      >
        {project?.stack.slice(0, 4).join(" · ")}
      </div>
    </div>,
    size,
  );
}
