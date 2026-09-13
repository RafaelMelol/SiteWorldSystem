import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/SocialIcons";
import { LogoMark } from "@/components/layout/LogoMark";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { footerNav } from "@/content/nav";
import { contactInfo } from "@/content/contact";

export function Footer() {
  const year = new Date().getFullYear();
  const { address, phoneDisplay, phone, email, social } = contactInfo;

  return (
    <footer className="border-t border-border-subtle bg-surface-muted">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <LogoMark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/70">
              Soluções em TI para gestão e automação de indústria, atacado e
              varejo desde 1993.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {social.facebook && (
                <SocialLink href={social.facebook} label="Facebook">
                  <FacebookIcon className="size-4" />
                </SocialLink>
              )}
              {social.instagram && (
                <SocialLink href={social.instagram} label="Instagram">
                  <InstagramIcon className="size-4" />
                </SocialLink>
              )}
              {social.linkedin && (
                <SocialLink href={social.linkedin} label="LinkedIn">
                  <LinkedinIcon className="size-4" />
                </SocialLink>
              )}
            </div>
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

            <h3 className="mt-6 text-sm font-semibold text-foreground">
              Newsletter
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              Receba novidades e informações da World System por e-mail.
            </p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-6 text-xs text-foreground/60">
          <p>
            © {year} World System – Soluções em TI. Todos os direitos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
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

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-colors hover:border-brand-fg hover:text-brand-fg"
    >
      {children}
    </a>
  );
}
