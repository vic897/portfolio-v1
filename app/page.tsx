"use client"; // We need this at the top for the onSubmit and Alerts to work

import Image from "next/image";
import { sendEmail } from "./actions";
import { SubmitButton } from "./SubmitButton";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col font-sans">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="container-pad flex h-16 items-center justify-between">
          <a href="#top" className="group inline-flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl panel-solid"
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
              Vinay
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#skills">Skills</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white panel hover:border-white/20"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent-2)" }} />
            Let’s talk
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="container-pad pt-14 sm:pt-20">
          <div className="relative overflow-hidden rounded-3xl panel-solid">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(600px 260px at 22% 12%, rgba(45,125,255,0.35), transparent 60%), radial-gradient(520px 240px at 85% 35%, rgba(100,210,255,0.22), transparent 60%)",
              }}
            />
            <div className="relative p-7 sm:p-10 lg:p-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="glow-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                    Open to Internships
                  </span>
                </div>
                <div className="max-w-3xl">
                  <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
                    Building crisp, modern web experiences with a focus on speed and polish.
                  </h1>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(135deg, rgba(45,125,255,1), rgba(100,210,255,0.95))",
                      boxShadow: "0 16px 45px rgba(45,125,255,0.25)",
                    }}
                  >
                    View projects
                  </a>
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white/90 panel">
                    Contact me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container-pad mt-14 sm:mt-20">
           <h2 className="text-2xl font-semibold text-white sm:text-3xl">Projects</h2>
           <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-6">
            <ProjectCard
              className="md:col-span-4"
              title="Electric UI Dashboard"
              desc="Analytics dashboard with crisp typography and dark-first design."
              tags={["Next.js", "Tailwind"]}
              cta="Case study"
              imageSrc="/projects/portfolio-v1.png"
              imageAlt="Portfolio dashboard"
              priority
            />
             <ProjectCard
              className="md:col-span-2"
              title="Internship Tracker"
              desc="A lightweight app for tracking applications and notes."
              tags={["React", "UX"]}
              cta="Preview"
              imageSrc="/projects/internship-tracker.png"
              imageAlt="Internship app"
            />
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container-pad mt-14 pb-16 sm:mt-20 sm:pb-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-3xl panel-solid p-7 sm:p-10">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Let’s build something clean.</h2>
              <p className="mt-3 text-white/60">If you have an opportunity or a project, send a message.</p>
              <div className="mt-7 grid gap-3">
                <InfoPill label="Email" value="vinaymathpati16@gmail.com" />
                <InfoPill label="Location" value="Bengaluru, India" />
              </div>
            </div>

            <div className="rounded-3xl panel-solid p-7 sm:p-10">
              {/* FIXED FORM LOGIC */}
              <form 
                className="grid gap-4" 
                action={async (formData) => {
                  const result = await sendEmail(formData);
                  if (result.success) {
                    alert("Message sent successfully!");
                    const form = document.querySelector('form') as HTMLFormElement;
                    form?.reset();
                  } else {
                    alert("Failed to send message. Check console.");
                  }
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" required />
                  <Field label="Email" name="email" placeholder="you@domain.com" type="email" required />
                </div>
                <Field label="Subject" name="subject" placeholder="Internship opportunity" required />
                <Field
                  label="Message"
                  name="message"
                  placeholder="Tell me a bit about the project…"
                  multiline
                  required
                />
                <div className="mt-2 flex justify-end">
                  <SubmitButton />
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ProjectCard({ title, desc, tags, cta, imageSrc, imageAlt, priority, className = "" }: any) {
  return (
    <article className={`group relative overflow-hidden rounded-3xl p-6 panel-solid ${className}`}>
      <div className="relative flex flex-col gap-4">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <Image src={imageSrc} alt={imageAlt} width={800} height={500} className="h-44 w-full object-cover" priority={priority} />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/60">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t: string) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 panel">
      <span className="text-sm font-semibold text-white/80">{label}</span>
      <span className="text-sm text-white/60">{value}</span>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", multiline, required }: any) {
  const base = "mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/90 focus:border-blue-500 outline-none";
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white/80">{label}</span>
      {multiline ? (
        <textarea required={required} className={`${base} min-h-[120px]`} name={name} placeholder={placeholder} />
      ) : (
        <input required={required} className={base} name={name} placeholder={placeholder} type={type} />
      )}
    </label>
  );
}