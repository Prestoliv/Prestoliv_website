import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import residentialImg from "@/assets/3.jpg";
import commercialImg from "@/assets/2.jpg";
import interiorsImg from "@/assets/1.jpg";

const links = [
  { label: "Our Process", href: "/process" },
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
    description: "Offices, retail & clinics engineered around operations.",
    tag: null,
  },
  {
    label: "Interior Design",
    href: "/services/interiors",
    image: interiorsImg,
    description: "Full-home interiors managed from concept to handover.",
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) console.error("Error logging in:", error.message);
  };

  const handleDashboardClick = () => {
    if (user) {
      window.open(`https://prestoliv-dashboard.vercel.app/at/profile?uid=${user.id}`, "_blank");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`w-full max-w-6xl flex items-center justify-between gap-6 px-4 sm:px-6 h-14 rounded-[10px] transition-all duration-500 ease-smooth ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-card border border-border"
            : "bg-white/70 backdrop-blur-md border border-white/60 shadow-soft"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Prestoliv" className="h-6 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent data-[state=open]:bg-transparent focus:bg-transparent gap-1">
                Our Services
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                {/* Rich dropdown panel */}
                <div className="w-[520px] p-3">
                  <div className="grid grid-cols-1 gap-1.5">
                    {services.map((service) => {
                      return (
                        <NavigationMenuLink asChild key={service.href}>
                          <Link
                            to={service.href}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="group flex items-center gap-4 rounded-xl p-3.5 transition-all duration-200 hover:bg-accent/60 focus:bg-accent/60 outline-none"
                          >
                            {/* Icon box */}
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border/60">
                              <img
                                src={service.image}
                                alt={service.label}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground leading-none">
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
                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-all duration-200 group-hover:text-brand group-hover:translate-x-0.5 shrink-0" />
                          </Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </div>

                  {/* Footer strip */}
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 px-4 py-3">
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
              </NavigationMenuContent>
            </NavigationMenuItem>

            {links.map((l) => (
              <NavigationMenuItem key={l.href}>
                <NavigationMenuLink asChild>
                  <Link
                    to={l.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-brand after:transition-all hover:after:w-full"
                  >
                    {l.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" className="rounded-md" onClick={handleDashboardClick}>
              View Dashboard
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="rounded-md" onClick={handleGoogleLogin}>
              Login
            </Button>
          )}
          <ConsultationDialog>
            <Button size="sm" className="rounded-md bg-foreground text-background hover:bg-foreground/90">
              Book a Consultation
            </Button>
          </ConsultationDialog>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-muted"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 inset-x-4 md:hidden bg-white border border-border rounded-[14px] shadow-card overflow-hidden"
          >
            {/* Services accordion */}
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
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-1">
                      {services.map((service) => {
                        return (
                          <Link
                            key={service.href}
                            to={service.href}
                            onClick={() => {
                              setOpen(false);
                              setServicesOpen(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="group flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-accent/60 transition-colors"
                          >
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border/60">
                              <img
                                src={service.image}
                                alt={service.label}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{service.label}</span>
                                {service.tag && (
                                  <span className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-brand">
                                    {service.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{service.description}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            <div className="px-5 py-3 space-y-1 border-b border-border/60">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => {
                    setOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="block py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="p-4 space-y-2">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => { handleDashboardClick(); setOpen(false); }}
                >
                  View Dashboard
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => { handleGoogleLogin(); setOpen(false); }}
                >
                  Login
                </Button>
              )}
              <ConsultationDialog>
                <Button className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90">
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