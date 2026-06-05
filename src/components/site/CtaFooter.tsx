import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import { useContactSettings } from "@/components/ContactSettingsProvider";
import { buttonIdFromLabel, FOOTER_SERVICE_LINKS, slugifyButtonLabel, trackOutboundContact, trackPhoneClick, trackSocialClick } from "@/lib/analytics";
import { TrackableLink } from "@/components/analytics/TrackableLink";
import logo from "@/assets/logo.svg";

const cols = [
  {
    title: "Company",
    links: [
      { label: "Process", href: "/process" },
      { label: "About us", href: "/about" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/prestoliv_official/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/prestoliv/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61573836098768", label: "Facebook" },
];

export const CtaFooter = () => {
  const { phoneDisplay, phoneE164 } = useContactSettings();

  const contacts = [
    { icon: Phone, label: phoneDisplay, href: `tel:${phoneE164}` },
    { icon: Mail, label: "hello@prestoliv.com", href: "mailto:hello@prestoliv.com" },
    { icon: MapPin, label: "Prestoliv Proptech Private Limited : Plot No. A-50, D K Enclave, Miyapur, Hyderabad, Telangana, India - 500049.", href: "#" },
  ];

  return (
  <>
    <section id="footer-cta" className="relative overflow-hidden py-28 bg-gradient-hero">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, hsl(var(--brand)/0.35), transparent 70%)" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
          Build with the certainty you deserve
        </h2>
        <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Tell us about your project. We'll come back with a feasibility plan, a guaranteed timeline and a locked, itemized price.
        </p>
        <div className="mt-8 flex justify-center">
          <ConsultationDialog source="footer_cta" buttonLabel="Start Your Project">
            <Button size="lg" className="rounded-[10px] bg-brand text-background hover:bg-brand/90 group">
              Start Your Project
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </ConsultationDialog>
        </div>
      </div>
    </section>

    <footer id="site-footer" className="bg-foreground text-background/90">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">

        {/* Brand col */}
        <div className="col-span-2">
          <img src={logo} alt="Prestoliv" className="h-7 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm text-background/60 max-w-xs">
            Construction, finally done right. 3D walkthroughs, daily site updates and a price that's locked the day you sign.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-background/60">
            <span className="size-2 rounded-full bg-brand animate-pulse" />
            All systems operational
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => {
              return (
                <a
                  key={label}
                  id={buttonIdFromLabel(label)}
                  data-analytics-id={slugifyButtonLabel(label)}
                  data-button-id={slugifyButtonLabel(label)}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() =>
                    trackSocialClick({
                      platform: label.toLowerCase(),
                      location: "footer",
                    })
                  }
                  className="flex items-center justify-center size-8 rounded-md border border-background/10 text-background/50 hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Services col */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-background/50">Services</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <TrackableLink
                  to={l.href}
                  linkText={l.label}
                  navLocation="footer"
                  serviceInterest={l.interest}
                  className="hover:text-brand transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {l.label}
                </TrackableLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Company col */}
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs font-semibold uppercase tracking-widest text-background/50">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <TrackableLink
                    to={l.href}
                    linkText={l.label}
                    navLocation="footer"
                    className="hover:text-brand transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {l.label}
                  </TrackableLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Us col */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-background/50">Contact Us</div>
          <ul className="mt-4 space-y-3">
            {contacts.map(({ icon: Icon, label, href }) => {
              const contactType =
                href.startsWith("tel:") ? "phone" : href.startsWith("mailto:") ? "email" : null;
              return (
                <li key={label}>
                  <a
                    id={buttonIdFromLabel(label)}
                    data-analytics-id={slugifyButtonLabel(label)}
                    data-button-id={slugifyButtonLabel(label)}
                    href={href}
                    onClick={() => {
                      if (contactType === "phone") {
                        trackPhoneClick(href);
                      } else if (contactType === "email") {
                        trackOutboundContact("email", "footer");
                      }
                    }}
                    className="flex items-start gap-2.5 text-sm text-background/60 hover:text-brand transition-colors group"
                  >
                    <Icon className="size-4 mt-0.5 shrink-0 text-background/40 group-hover:text-brand transition-colors" />
                    <span>{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      <div className="border-t border-background/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-background/50">
          <span>© {new Date().getFullYear()} Prestoliv. All rights reserved.</span>
          <div className="flex gap-6">
            <a id={buttonIdFromLabel("Terms")} data-analytics-id="terms" data-button-id="terms" href="#" className="hover:text-background">
              Terms
            </a>
            <a id={buttonIdFromLabel("Privacy")} data-analytics-id="privacy" data-button-id="privacy" href="#" className="hover:text-background">
              Privacy
            </a>
            <a id={buttonIdFromLabel("Cookies")} data-analytics-id="cookies" data-button-id="cookies" href="#" className="hover:text-background">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>
  );
};