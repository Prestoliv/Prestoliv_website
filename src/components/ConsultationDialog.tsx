import { cloneElement, isValidElement, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import {
  trackConsultationFormError,
  trackConsultationFormStart,
  trackConsultationLead,
  trackConsultationModalClose,
  trackConsultationModalOpen,
  type ConsultationSource,
} from "@/lib/analytics";
import {
  analyticsDataAttributes,
  buttonIdFromLabel,
  consultationSubmitId,
  slugifyButtonLabel,
} from "@/lib/analytics/ids";

const SUBMIT_LABEL = "Submit Consultation Request";

type ConsultationDialogProps = {
  children: React.ReactNode;
  /** Placement for lead_source in reports (internal). */
  source: ConsultationSource;
  /** Visible label on the trigger — used for HTML id (e.g. "Get started" → btn-get-started). */
  buttonLabel: string;
};

export const ConsultationDialog = ({ children, source, buttonLabel }: ConsultationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formStarted = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    otherService: "",
  });

  const buttonSlug = slugifyButtonLabel(buttonLabel);
  const triggerId = buttonIdFromLabel(buttonLabel);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      trackConsultationModalOpen(source, buttonLabel);
      formStarted.current = false;
    } else if (open) {
      trackConsultationModalClose(source, buttonLabel);
    }
    setOpen(next);
  };

  const handleFormInteraction = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackConsultationFormStart(source, buttonLabel);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("contact_us").insert({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      city: formData.city.trim(),
      service: formData.service,
      other_service: formData.service === "others" ? formData.otherService.trim() : null,
    });

    setSubmitting(false);

    if (error) {
      trackConsultationFormError({ source, buttonLabel, errorMessage: error.message });
      toast({
        title: "Could not submit request",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    trackConsultationLead({
      service: formData.service,
      city: formData.city.trim(),
      source,
      hasEmail: !!formData.email.trim(),
      buttonLabel,
    });

    toast({
      title: "Request submitted",
      description: "We'll get back to you soon.",
    });
    setOpen(false);
    setFormData({ name: "", phone: "", email: "", city: "", service: "", otherService: "" });
  };

  const triggerProps = {
    id: triggerId,
    ...analyticsDataAttributes(buttonSlug),
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isValidElement(children)
          ? cloneElement(children, triggerProps as Record<string, string>)
          : children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book a Consultation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">

          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onFocus={handleFormInteraction}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              value={formData.phone}
              onFocus={handleFormInteraction}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email ID (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onFocus={handleFormInteraction}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City / Town *</Label>
            <Input
              id="city"
              placeholder="Your city"
              value={formData.city}
              onFocus={handleFormInteraction}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">What service are you looking for? *</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => {
                handleFormInteraction();
                setFormData({ ...formData, service: value });
              }}
              required
            >
              <SelectTrigger id="service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential Construction</SelectItem>
                <SelectItem value="commercial">Commercial Projects</SelectItem>
                <SelectItem value="renovation">Renovation & Remodeling</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.service === "others" && (
            <div className="space-y-2">
              <Label htmlFor="otherService">Please specify *</Label>
              <Textarea
                id="otherService"
                placeholder="Describe the service you're looking for"
                value={formData.otherService}
                onFocus={handleFormInteraction}
                onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                required
                rows={3}
              />
            </div>
          )}

          <Button
            id={consultationSubmitId(buttonLabel)}
            data-analytics-id={slugifyButtonLabel(SUBMIT_LABEL)}
            data-button-id={buttonSlug}
            type="submit"
            disabled={submitting}
            className="w-full bg-foreground text-background hover:bg-foreground/90"
          >
            {submitting ? "Submitting…" : SUBMIT_LABEL}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
};
