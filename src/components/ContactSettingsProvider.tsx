import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import {
  DEFAULT_CONTACT_SETTINGS,
  fetchContactSettings,
  type ContactSettings,
} from "@/lib/contactSettings";

const ContactSettingsContext = createContext<ContactSettings>(DEFAULT_CONTACT_SETTINGS);

export function ContactSettingsProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery({
    queryKey: ["contactSettings"],
    queryFn: fetchContactSettings,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <ContactSettingsContext.Provider value={data ?? DEFAULT_CONTACT_SETTINGS}>
      {children}
    </ContactSettingsContext.Provider>
  );
}

export function useContactSettings() {
  return useContext(ContactSettingsContext);
}
