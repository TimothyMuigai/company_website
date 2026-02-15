"use client";
import FinalCTASection from "@/components/Footer";
import { Navbar } from "@/components/landingPage/navs/navBar";
import { motion } from "framer-motion";

export default function News() {
  return (
    <>
      <Navbar />
      <section className="w-full py-15">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-sm text-gray-500">
                \ Resources
              </span>

              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                Deepfake News <br /> Center
              </h1>

              <p className="text-gray-600 max-w-md leading-7">
                Used by journalists and industry veterans, this database is
                updated daily with the latest news stories and is provided as
                a free service for research and news-gathering purposes.
              </p>
            </motion.div>

            {/* RIGHT SIDE FORM */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-10"
            >

              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500">
                  Work email*
                </label>
                <input
                  type="email"
                  placeholder="first.last@company.com"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                />
              </div>

              {/* Privacy Note */}
              <p className="text-sm text-gray-500 max-w-md">
                Please see our{" "}
                <span className="underline cursor-pointer">
                  Privacy Policy
                </span>{" "}
                to learn about how we will handle this information.
              </p>

              {/* Button */}
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-[#1E88C8] hover:bg-[#166DA3] transition px-8 py-3 text-white text-sm tracking-wide"
              >
                <span className="text-xs">▶</span>
                Access News Center
              </button>

            </motion.form>

          </div>
        </div>
      </section>
      <FinalCTASection/>
    </>
  );
}