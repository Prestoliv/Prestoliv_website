import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How can I track my project's daily progress?",
    a: "Open your dashboard. Today's site photos are there. Yesterday's completed work is logged. Tomorrow's scheduled tasks are listed. Your payment status, material approvals, and direct chat with your project manager — same place. Web and mobile, updated by 7 PM every working day.",
  },
  {
    q: "Does Prestoliv handle government approvals and financing?",
    a: "Yes. We manage the full approval journey — plan sanction, commencement certificate, and statutory clearances — and coordinate with banks for home loan disbursement. You get one team tracking every document, so you're not running between offices chasing paperwork.",
  },
  {
    q: "How do you ensure the project stays on schedule?",
    a: "Every Prestoliv project runs on a data-driven timeline with each dependency mapped in advance. Our scheduling system flags slippage risk weeks before it reaches site, and your completion date is committed in writing, with a delay penalty built into the contract.",
  },
  {
    q: "What happens if material costs increase mid-project?",
    a: "Your contract locks pricing upfront, so mid-project market fluctuations don't land on you as surprise bills. Any genuine, client-approved change is itemised and visible on your dashboard before it's actioned — no hidden cost creep.",
  },
  {
    q: "Who is responsible if something goes wrong during construction?",
    a: "Prestoliv is. Architects, structural engineers, MEP, project managers, finishers, and interior teams all sit under one roof. There's no subcontractor blame game — one accountable team builds your home, and the same team fixes anything that isn't right.",
  },
  {
    q: "Can I make design changes after construction has started?",
    a: "Yes, within practical limits. Because your home starts as a detailed 3D model, most changes are caught before site work begins, when they cost nothing. Any change made later is documented with cost, timeline impact, and sign-off, so you always decide with full clarity.",
  },
  {
    q: "How is Prestoliv different from hiring a contractor or architect separately?",
    a: "A traditional build splits design, engineering, execution, and interiors across vendors who rarely coordinate. Prestoliv unifies all of it on one platform with one timeline, one point of accountability, and one dashboard — turnkey home construction without the coordination chaos.",
  },
  {
    q: "What types of projects does Prestoliv take on?",
    a: "Prestoliv builds individual homes, villas, and residential projects end to end — from design and approvals through structure, finishing, and interiors. Whether it's a new build on your plot or a full turnkey home, you get the same transparent process and committed timeline.",
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