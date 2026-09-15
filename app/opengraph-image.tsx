import { ImageResponse } from "next/og";

/**
 * Imagem de prévia (1200x630) que aparece quando um link do site é
 * compartilhado no WhatsApp, LinkedIn, Facebook etc. O Next gera o PNG a
 * partir deste JSX.
 *
 * Os estilos são inline porque o gerador de imagem não lê o CSS do site.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d1c34 0%, #162f54 55%, #21529f 100%)",
        }}
      >
        {/* Marca: ícone e nome */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7L12 3L21 7V17L12 21L3 17V7Z"
                stroke="#21529f"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M3 7L12 11L21 7M12 11V21"
                stroke="#21529f"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "white" }}>
            World System
          </div>
        </div>

        {/* Título */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 54,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Soluções em TI para gestão e automação empresarial
        </div>

        {/* Subtítulo */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Desde 1993 · Indústria, atacado e varejo
        </div>
      </div>
    ),
    { ...size }
  );
}
