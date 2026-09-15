import type { SVGProps } from "react";
import { contactInfo } from "@/content/contact";
import { cn } from "@/lib/utils";

/**
 * Botões redondos com as redes sociais da World System (Facebook, Instagram
 * e LinkedIn). Usado no rodapé e na página de Contato.
 *
 * Os endereços vêm de content/contact.ts; rede sem link não aparece.
 */
export function SocialLinks({ className }: { className?: string }) {
  const { social } = contactInfo;
  const networks = [
    { label: "Facebook", href: social.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: social.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", href: social.linkedin, Icon: LinkedinIcon },
  ].filter((network) => network.href);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {networks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-10 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-colors hover:border-brand-fg hover:text-brand-fg"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}

/* Ícones das redes, em SVG próprio (a biblioteca lucide não inclui logos de marcas). */

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M14.5 8.5H16.5V5.5H14.5C12.5 5.5 11 7 11 9V11H9V14H11V19H14V14H16L16.5 11H14V9C14 8.7 14.2 8.5 14.5 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.8 10V16.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="7.8" cy="7.4" r="1.05" fill="currentColor" />
      <path
        d="M11.3 16.5V13C11.3 11.6 12.1 10.7 13.3 10.7C14.5 10.7 15.1 11.5 15.1 13V16.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.3 10.9V16.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
