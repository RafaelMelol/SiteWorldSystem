import type { NextConfig } from "next";

/**
 * Configuração do Next.js.
 *
 * Adiciona cabeçalhos de segurança em todas as respostas do site.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Impede o navegador de "adivinhar" o tipo dos arquivos.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Só permite exibir o site dentro de iframes do próprio domínio.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Ao seguir um link externo, envia só o domínio, e não a URL completa.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Bloqueia o acesso a câmera, microfone e localização.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
