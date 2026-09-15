import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CustomCursor, MotionProvider, ScrollProgress } from "@/components/layout/Effects";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/config";

/**
 * Layout raiz: envolve todas as páginas com o cabeçalho, o rodapé e os
 * efeitos globais (barra de progresso de leitura e cursor personalizado).
 */

// Fonte principal. O Next baixa o arquivo no build e serve junto com o site.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const defaultTitle = `${siteConfig.shortName} – Soluções em TI para Gestão e Automação`;

// Metadados padrão (título da aba, descrição e prévias de link). Cada página
// pode definir o próprio título, que vira "Título da página | World System".
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: defaultTitle, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

// Roda antes de a página aparecer: aplica o tema salvo pelo visitante, para a
// tela não "piscar" no tema errado durante o carregamento.
const themeInitScript = `
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script acima altera o <html> antes do React assumir.
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <ScrollProgress />
          <CustomCursor />

          {/* Atalho de acessibilidade para quem navega pelo teclado */}
          <a href="#main-content" className="skip-link">
            Pular para o conteúdo
          </a>

          <Header />
          {/* pt-18 compensa a altura do cabeçalho fixo */}
          <main id="main-content" className="flex-1 pt-18">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
