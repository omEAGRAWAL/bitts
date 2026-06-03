export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "We work with businesses of all sizes — from solo founders to growing SMBs. If you have a process, workflow, or customer journey that needs a digital solution, we can build it.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A standard website takes 2–4 weeks. A web application or custom system typically takes 6–12 weeks depending on complexity. We'll give you a clear timeline after our discovery call.",
  },
  {
    question: "Do I need any technical knowledge to work with you?",
    answer:
      "None at all. We translate your business requirements into technical solutions — you just need to know your business.",
  },
  {
    question: "What's the difference between custom software and off-the-shelf tools?",
    answer:
      "Off-the-shelf tools make you fit their process. Custom software fits your process. The difference is efficiency, ownership, and software that actually grows with you.",
  },
  {
    question: "What happens after my product launches?",
    answer:
      "We don't disappear. We provide 24/7 live support, monitor the product, and continue improving it based on your feedback.",
  },
  {
    question: "How does your 24/7 support work?",
    answer:
      "You get direct access to our team via WhatsApp and email at any hour. No ticket queues, no bots — real responses.",
  },
  {
    question: "Can you improve my existing website or software?",
    answer:
      "Yes. Revamps are one of our core services. We audit what you have, identify what's holding it back, and rebuild it right.",
  },
  {
    question: "Do I own all the code after the project?",
    answer:
      "Completely. You receive full source code, deployment access, and ownership of all data. No lock-in.",
  },
];
