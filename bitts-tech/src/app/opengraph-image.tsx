import { ImageResponse } from "next/og";

export const alt = "Bitts Tech";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#FFFFFF",
          color: "#0F172A",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ fontSize: 86, fontWeight: 800 }}>Bitts Tech</div>
        <div style={{ color: "#64748B", fontSize: 34, marginTop: 22 }}>
          Your Vision. Our Code.
        </div>
        <div
          style={{
            background: "#2563EB",
            bottom: 0,
            height: 18,
            left: 0,
            position: "absolute",
            right: 0,
          }}
        />
      </div>
    ),
    size,
  );
}
