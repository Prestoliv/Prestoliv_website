import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ConsultationDialog } from "@/components/ConsultationDialog";

const links = [
  { label: "Our Services", href: "/services" },
  { label: "Our Process", href: "/process" },
  { label: "About Us", href: "/about" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleDashboardClick = () => {
    if (user) {
      window.open(`https://prestoliv-dashboard.vercel.app/at/profile?uid=${user.id}`, '_blank');
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
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Prestoliv" className="h-6 w-auto" />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {links.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="relative hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-brand after:transition-all hover:after:w-full" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" className="rounded-md" onClick={handleDashboardClick}>View Dashboard</Button>
          ) : (
            <Button variant="ghost" size="sm" className="rounded-md" onClick={handleGoogleLogin}>Login</Button>
          )}
          <ConsultationDialog>
            <Button size="sm" className="rounded-md bg-foreground text-background hover:bg-foreground/90">Book a Consultation</Button>
          </ConsultationDialog>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md hover:bg-muted" aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="absolute top-20 inset-x-4 md:hidden bg-white border border-border rounded-[10px] shadow-card p-4 space-y-2">
          {links.map((l) => (
            <Link key={l.href} to={l.href} onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block py-2 text-sm font-medium">
              {l.label}
            </Link>
          ))}
          <ConsultationDialog>
            <Button className="w-full rounded-md bg-foreground text-background hover:bg-foreground/90">Book a Consultation</Button>
          </ConsultationDialog>
        </div>
      )}
    </motion.header>
  );
};