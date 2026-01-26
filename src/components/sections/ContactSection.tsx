"use client";

import { useState } from "react";

export function SectionContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동 / EmailJS / Formspree
    console.log(form);
    alert("메시지가 전송되었습니다!");
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white flex items-center"
    >
      <div className="max-w-4xl mx-auto px-6 w-full">

        <h1 className="text-4xl font-bold mb-12">Contact</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl space-y-6"
        >
          {/* NAME */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
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
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:border-white"
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
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:border-white resize-none"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-6 px-6 py-3 border border-white hover:bg-white hover:text-black transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
