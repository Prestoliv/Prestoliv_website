import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How can I track my project's daily progress?",
    a: "Open your dashboard. Today's site photos are there. Yesterday's completed work is logged. Tomorrow's scheduled tasks are listed. Your payment status, material approvals, and direct chat with your project manager — same place. Web and mobile, updated by 7 PM every working day.",
  },
  {
    q: "Does Prestoliv handle government approvals and financing?",
    a: "Yes. We file building plan sanctions, secure NOCs, and coordinate clearances with municipal authorities. For financing, we work with leading banks to secure your construction loan and align disbursement with construction milestones — so you only draw what you've used. You sign where needed. We handle every queue in between.",
  },
  {
    q: "How do you ensure the project stays on schedule?",
    a: "Two ways. First, the contract — your finish date is written in, with a delay penalty attached. Second, the system behind it: AI scheduling that watches every dependency in your project and flags risks weeks before they hit. We act early. We don't explain late.",
  },
  {
    q: "What happens if material costs increase mid-project?",
    a: "Nothing, to your bill. Fixed-price contracts mean we absorb commodity volatility. Steel doubles, cement spikes, sand gets scarce: that's our problem to solve, not yours. The only thing that changes your number is you changing the scope, and that's quoted, written, and approved before a single rupee moves.",
  },
];

export const Faq = () => (
  <section className="py-24 bg-background">
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-brand">FAQs</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">Questions, answered.</h2>
        <p className="mt-3 text-muted-foreground">If we missed something, our team is one message away.</p>
      </div>
      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`i-${i}`}
            className="rounded-md border border-border bg-card px-5 shadow-soft data-[state=open]:shadow-card transition-shadow"
          >
            <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);