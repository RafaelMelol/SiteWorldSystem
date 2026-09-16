import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LogoMark } from "@/components/layout/LogoMark";
import { Container } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { contactInfo } from "@/content/contact";
import { footerNav } from "@/content/nav";
import type { NavLink } from "@/content/types";

export function Footer() {
  const { address, phone, phoneDisplay, email } = contactInfo;

  return (
    <footer className="border-t border-border-subtle bg-surface-muted">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <LogoMark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/70">
              Soluções em TI para gestão e automação de pequenas indústrias,
              atacados e varejos desde 1993.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <FooterColumn title="Institucional" links={footerNav.institucional} />
          <FooterColumn title="Soluções" links={footerNav.solucoes} />

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contato</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-fg" aria-hidden />
                <span>
                  {address.street} – {address.neighborhood}
                  <br />
                  {address.zip} – {address.city}/{address.state}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-fg" aria-hidden />
                <a href={`tel:${phone}`} className="hover:text-foreground">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand-fg" aria-hidden />
                <a href={`mailto:${email}`} className="hover:text-foreground">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border-subtle pt-6 text-xs text-foreground/60">
          © {new Date().getFullYear()} World System – Soluções em TI. Todos os
          direitos reservados.
        </p>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
