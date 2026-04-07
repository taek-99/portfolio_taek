"use client";

import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";
import { withBasePath } from "../../lib/site";

const satelliteImagePrimary = withBasePath(
  "/artificial satellite/—Pngtree—space day satellite illustration_4640589.png",
);

const satelliteImageSecondary = withBasePath(
  "/artificial satellite/—Pngtree—science and technology military satellite_5457404.png",
);

export function SectionContact() {
  const [state, handleSubmit] = useForm("xdagwkbq");

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="relative flex min-h-screen items-center py-24 text-white"
      >
        <SatelliteDecoration className="-left-6 top-10 hidden md:block lg:-left-12" imageSrc={satelliteImageSecondary} />
        <SatelliteDecoration
          className="-right-6 bottom-12 hidden md:block lg:-right-12"
          imageSrc={satelliteImagePrimary}
          reverse
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
              Contact
            </p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">Contact</h1>
          </div>

          <div className="mt-12 rounded-[36px] border border-white/10 bg-white/[0.05] px-8 py-16 text-center shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm md:px-12">
            <p className="text-slate-300">메시지가 성공적으로 전송되었습니다. 감사합니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center py-24 text-white"
    >
      <SatelliteDecoration className="-left-6 top-10 hidden md:block lg:-left-12" imageSrc={satelliteImageSecondary} />
      <SatelliteDecoration
        className="-right-6 bottom-12 hidden md:block lg:-right-12"
        imageSrc={satelliteImagePrimary}
        reverse
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Contact</h1>
        </div>

        <div className="mt-12 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(148,163,184,0.14),rgba(71,85,105,0.2))] px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm md:px-12 md:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Name</label>
                <input
                  name="name"
                  required
                  className="w-full rounded-none border border-white/15 bg-slate-950/55 px-4 py-3 text-white focus:border-sky-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-none border border-white/15 bg-slate-950/55 px-4 py-3 text-white focus:border-sky-300 focus:outline-none"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-none border border-white/15 bg-slate-950/55 px-4 py-3 text-white focus:border-sky-300 focus:outline-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="mt-6 border border-white/30 px-6 py-3 text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="space-y-6 rounded-[28px] border border-white/10 bg-slate-900/35 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  GitHub
                </p>
                <a
                  href="https://github.com/taek-99"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-lg font-semibold text-white transition hover:text-sky-300"
                >
                  github.com/taek-99
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Email
                </p>
                <a
                  href="mailto:gunha1215@gmail.com"
                  className="mt-2 block text-lg font-semibold text-white transition hover:text-sky-300"
                >
                  gunha1215@gmail.com
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Tel
                </p>
                <a
                  href="tel:01083564007"
                  className="mt-2 block text-lg font-semibold text-white transition hover:text-sky-300"
                >
                  010-8356-4007
                </a>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-2xl font-bold text-white">Thank You!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SatelliteDecoration({
  className,
  imageSrc,
  reverse = false,
}: {
  className: string;
  imageSrc: string;
  reverse?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className} ${
        reverse ? "float-satellite-reverse" : "float-satellite"
      }`}
    >
      <div className="relative h-44 w-44 opacity-80 lg:h-52 lg:w-52">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-contain drop-shadow-[0_14px_34px_rgba(15,23,42,0.42)]"
        />
      </div>
    </div>
  );
}
