"use client";

import { motion } from "framer-motion";

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "organization", label: "Organization / Agency", type: "text" },
  { name: "email", label: "Email", type: "email" },
];

export function Contact() {
  return (
    <section id="contact" className="relative bg-navy px-6 py-28 md:px-14 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">Contact</p>
        <h2 className="mt-4 font-sans text-4xl font-bold leading-tight text-paper md:text-6xl">
          Request a Briefing
        </h2>
        <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-mist/70">
          For qualified inquiries from nations, agencies, and prime partners.{" "}
          <span className="text-mist">[ Placeholder — confirm eligibility copy ]</span>
        </p>

        <form className="mt-12 flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          {FIELDS.map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="group relative border-b border-mist/25 pb-2 focus-within:border-mist"
            >
              <label
                htmlFor={field.name}
                className="block font-mono text-[11px] uppercase tracking-[0.2em] text-mist/60 transition-colors group-focus-within:text-mist"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete="off"
                className="mt-2 w-full bg-transparent font-sans text-lg text-paper outline-none placeholder:text-mist/30"
              />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-mist transition-[width] duration-300 group-focus-within:w-full" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="group relative border-b border-mist/25 pb-2 focus-within:border-mist"
          >
            <label
              htmlFor="message"
              className="block font-mono text-[11px] uppercase tracking-[0.2em] text-mist/60 transition-colors group-focus-within:text-mist"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="mt-2 w-full resize-none bg-transparent font-sans text-lg text-paper outline-none"
            />
            <span className="absolute bottom-0 left-0 h-px w-0 bg-mist transition-[width] duration-300 group-focus-within:w-full" />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ letterSpacing: "0.14em" }}
            transition={{ duration: 0.25 }}
            className="mt-4 w-fit border border-mist/40 px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-mist hover:bg-mist hover:text-navy"
          >
            Submit Request
          </motion.button>
          <p className="font-mono text-[11px] text-mist/40">
            [ Placeholder — form submission is not yet wired to a backend/email service ]
          </p>
        </form>
      </motion.div>
    </section>
  );
}
