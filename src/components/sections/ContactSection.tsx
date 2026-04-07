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
        className="relative flex min-h-screen items-center overflow-hidden py-24 text-white"
      >
        <SatelliteDecoration className="left-6 top-10 hidden md:block" imageSrc={satelliteImageSecondary} />
        <SatelliteDecoration
          className="bottom-12 right-6 hidden md:block"
          imageSrc={satelliteImagePrimary}
          reverse
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
          <h1 className="mb-8 text-4xl font-bold">Contact</h1>
          <div className="rounded-[36px] border border-white/10 bg-white/[0.05] px-8 py-16 text-center shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm md:px-12">
            <p className="text-slate-300">메시지가 성공적으로 전송되었습니다. 감사합니다.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden py-24 text-white"
    >
      <SatelliteDecoration className="left-6 top-10 hidden md:block" imageSrc={satelliteImageSecondary} />
      <SatelliteDecoration
        className="bottom-12 right-6 hidden md:block"
        imageSrc={satelliteImagePrimary}
        reverse
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <h1 className="mb-8 text-4xl font-bold">Contact</h1>
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(148,163,184,0.14),rgba(71,85,105,0.2))] px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-sm md:px-12 md:py-12">
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
