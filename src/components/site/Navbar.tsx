import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";

import { Button } from "@/components/ui/button";

import { supabase } from "@/lib/supabase";

import { ConsultationDialog } from "@/components/ConsultationDialog";

import residentialImg from "@/assets/3.jpg";
import commercialImg from "@/assets/2.jpg";
import interiorsImg from "@/assets/1.jpg";

const links = [
  { label: "Our Process", href: "/process" },
  { label: "Calculator", href: "/calculator" },
  { label: "About Us", href: "/about" },
];

const services = [
  {
    label: "Residential",
    href: "/services/residential",
    image: residentialImg,
    description: "Homes, villas & renovations built around how you live.",
    tag: "Most Popular",
  },
  {
    label: "Commercial",
    href: "/services/commercial",
    image: commercialImg,
    description:
      "Offices, retail & clinics engineered around operations.",
    tag: null,
  },
  {
    label: "Interior Design",
    href: "/services/interiors",
    image: interiorsImg,
    description:
      "Full-home interiors managed from concept to handover.",
    tag: null,
  },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) console.error(error.message);
  };

  const handleDashboardClick = () => {
    if (user) {
      window.open(
        `https://prestoliv-dashboard.vercel.app/at/profile?uid=${user.id}`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`w-full max-w-6xl flex items-center justify-between gap-6 px-4 sm:px-6 h-16 rounded-[10px] transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-2xl border border-border shadow-[0_10px_50px_rgba(0,0,0,0.08)]"
            : "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Prestoliv"
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-0">
            {/* Services Dropdown ONLY */}
            <div className="relative group mr-2">
              {/* Main Nav Link */}
              <Link
                to="/services"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  h-11
                  px-5
                  rounded-[10px]
                  text-sm
                  font-medium
                  text-foreground/80
                  hover:text-foreground
                  transition-all
                  duration-200
                  hover:bg-muted/40
                  focus:bg-muted/40
                  outline-none
                "
              >
                Our Services

                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Link>

              {/* Dropdown */}
              <div
                className="
                  absolute
                  top-full
                  left-0
                  pt-3
                  opacity-0
                  invisible
                  translate-y-2
                  pointer-events-none
                  transition-all
                  duration-200
                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:pointer-events-auto
                "
              >
                <div className="w-[540px] rounded-[10px] border border-border bg-white/95 backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.12)] p-3">
                  <div className="grid grid-cols-1 gap-1.5">
                    {services.map((service) => {
                      return (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() =>
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            })
                          }
                          className="
                            group/item
                            flex
                            items-center
                            gap-4
                            rounded-[10px]
                            p-3.5
                            transition-all
                            duration-200
                            hover:bg-muted/50
                          "
                        >
                          {/* Image */}
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-border/60">
                            <img
                              src={service.image}
                              alt={service.label}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">
                                {service.label}
                              </span>

                              {service.tag && (
                                <span className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                                  {service.tag}
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed truncate">
                              {service.description}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-all duration-200 group-hover/item:text-brand group-hover/item:translate-x-0.5 shrink-0" />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between rounded-[10px] border border-border/60 bg-muted/30 px-4 py-3">
                    <p className="text-xs text-muted-foreground">
                      Not sure where to start?
                    </p>

                    <ConsultationDialog>
                      <button className="text-xs font-semibold text-brand hover:underline underline-offset-2">
                        Book a free call →
                      </button>
                    </ConsultationDialog>
                  </div>
                </div>
              </div>
            </div>

            {/* Normal Links */}
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="
                  inline-flex
                  items-center
                  h-11
                  px-5
                  rounded-[10px]
                  text-sm
                  font-medium
                  text-foreground/80
                  hover:text-foreground
                  hover:bg-muted/40
                  transition-all
                  duration-200
                  ml-2
                "
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded-[10px]"
              onClick={handleDashboardClick}
            >
              View Dashboard
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-[10px]"
              onClick={handleGoogleLogin}
            >
              Login
            </Button>
          )}

          <ConsultationDialog>
            <Button className="rounded-[10px] bg-brand text-background hover:bg-brand/90">
              Book a Consultation
            </Button>
          </ConsultationDialog>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-20 inset-x-4 md:hidden bg-white border border-border rounded-[10px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {/* Services */}
            <div className="border-b border-border/60">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full px-5 py-4 text-sm font-semibold text-left"
              >
                Our Services

                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-1">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => {
                            setOpen(false);
                            setServicesOpen(false);

                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          className="group flex items-center gap-3 rounded-[10px] px-3 py-3 hover:bg-muted/40 transition-colors"
                        >
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-2xl border border-border/60">
                            <img
                              src={service.image}
                              alt={service.label}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {service.label}
                              </span>

                              {service.tag && (
                                <span className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-brand">
                                  {service.tag}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Links */}
            <div className="px-4 py-3 space-y-1 border-b border-border/60">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => {
                    setOpen(false);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="flex items-center h-11 px-4 rounded-[10px] text-sm font-medium text-foreground/80 hover:bg-muted/40 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="p-4 space-y-2">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full rounded-[10px]"
                  onClick={() => {
                    handleDashboardClick();
                    setOpen(false);
                  }}
                >
                  View Dashboard
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full rounded-[10px]"
                  onClick={() => {
                    handleGoogleLogin();
                    setOpen(false);
                  }}
                >
                  Login
                </Button>
              )}

              <ConsultationDialog>
                <Button className="w-full rounded-[10px] bg-brand text-background hover:bg-brand/90">
                  Book a Consultation
                </Button>
              </ConsultationDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};