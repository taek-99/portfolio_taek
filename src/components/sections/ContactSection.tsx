"use client";

import { useForm, ValidationError } from "@formspree/react";

export function SectionContact() {
  const [state, handleSubmit] = useForm("xdagwkbq"); // ⬅️ 네 Form ID

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="min-h-screen bg-black text-white flex items-center"
      >
        <div className="max-w-4xl mx-auto px-6 w-full text-center">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-gray-400">
            메시지가 성공적으로 전송되었습니다. 감사합니다!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white flex items-center"
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-4xl font-bold mb-12">Contact</h1>

        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
          {/* NAME */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Name
            </label>
            <input
              name="name"
              required
              className="w-full bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:border-white"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:border-white"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:border-white resize-none"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={state.submitting}
            className="mt-6 px-6 py-3 border border-white hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
