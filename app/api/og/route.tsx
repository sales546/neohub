import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Premium Coworking Spaces";
    const subtitle =
      searchParams.get("subtitle") || "Vibhuti Khand, Gomti Nagar, Lucknow";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, #0b1220 0%, #1a2336 55%, #2a1a14 100%)",
            padding: "64px 72px",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-80px",
              width: "420px",
              height: "420px",
              borderRadius: "999px",
              background: "rgba(255, 91, 46, 0.22)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-140px",
              left: "-60px",
              width: "360px",
              height: "360px",
              borderRadius: "999px",
              background: "rgba(255, 91, 46, 0.12)",
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  background: "#FF5B2E",
                  display: "flex",
                }}
              />
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#FF5B2E",
                  letterSpacing: "3px",
                }}
              >
                NEOHUB
              </span>
            </div>
            <span
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 500,
              }}
            >
              Coworking · Lucknow
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "980px",
              zIndex: 1,
              marginTop: "24px",
            }}
          >
            <h1
              style={{
                fontSize: title.length > 48 ? 52 : 62,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                margin: "0 0 18px 0",
                letterSpacing: "-1px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 26,
                color: "rgba(255,255,255,0.78)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "2px solid rgba(255,255,255,0.12)",
              paddingTop: "28px",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", gap: "28px", color: "#fff", fontSize: 18 }}>
              <span>Dual Fiber Internet</span>
              <span>24/7 Power Backup</span>
              <span>Private Cabins</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#FF5B2E" }}>
              neohubspaces.in
            </span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error) {
    console.error("Failed to generate OG Image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
