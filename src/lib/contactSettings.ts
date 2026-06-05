import { supabase } from "@/lib/supabase";

export const CONTACT_SETTINGS_KEY = "contact_settings";

export type ContactSettings = {
  whatsappNumber: string;
  phoneE164: string;
  phoneDisplay: string;
  whatsappEnabled: boolean;
};

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  whatsappNumber: "919849078569",
  phoneE164: "+919849078569",
  phoneDisplay: "+91 98490 78569",
  whatsappEnabled: true,
};

function str(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function parseContactSettings(value: unknown): ContactSettings {
  const o =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const d = DEFAULT_CONTACT_SETTINGS;

  const whatsappNumber = digitsOnly(
    str(o.whatsapp_number ?? o.whatsappNumber, d.whatsappNumber),
  );
  const phoneE164 = str(o.phone_e164 ?? o.phoneE164, d.phoneE164);
  const phoneDigits = digitsOnly(phoneE164);

  return {
    whatsappNumber: whatsappNumber || d.whatsappNumber,
    phoneE164: phoneDigits ? `+${phoneDigits}` : d.phoneE164,
    phoneDisplay: str(o.phone_display ?? o.phoneDisplay, d.phoneDisplay),
    whatsappEnabled: o.whatsapp_enabled !== false && o.whatsappEnabled !== false,
  };
}

export function buildWhatsAppUrl(whatsappNumber: string): string {
  const digits =
    digitsOnly(whatsappNumber) || DEFAULT_CONTACT_SETTINGS.whatsappNumber;
  return `https://wa.me/${digits}`;
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  const { data, error } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", CONTACT_SETTINGS_KEY)
    .maybeSingle();

  if (error || !data?.value) {
    return DEFAULT_CONTACT_SETTINGS;
  }

  return parseContactSettings(data.value);
}
