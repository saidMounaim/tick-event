import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#155dfc",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
            fill="#155dfc"
            fillOpacity="0.1"
          />
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
            stroke="#155dfc"
            strokeWidth="2"
          />
          <path
            d="M7 2v4"
            stroke="#155dfc"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 2v4"
            stroke="#155dfc"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M3 10h18" stroke="#155dfc" strokeWidth="2" />
          <circle cx="8" cy="14" r="1.5" fill="#155dfc" />
          <circle cx="12" cy="14" r="1.5" fill="#155dfc" />
          <circle cx="16" cy="14" r="1.5" fill="#155dfc" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
