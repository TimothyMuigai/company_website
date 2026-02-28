'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const executives = [
  {
    name: 'Bryan Koyundi',
    title: 'Founder & Chief Executive Officer',
    img: '/people/bryan.jpg',
    link: 'https://www.linkedin.com/in/bryane-fundraising-to-build-deeptrack-6a215a282',
    bio: 'Bryan founded Deeptrack to build verification infrastructure for high-trust systems. His work focuses on AI risk mitigation, financial integrity, and long-term digital governance in emerging and global markets.',
  },
  {
    name: 'Isaak Hayes',
    title: 'Head of Product Strategy & User Experience',
    img: '/people/hayes.jpg',
    link: 'https://www.linkedin.com/in/isaakhayes/',
    bio: 'Isaak leads product architecture and user systems design, ensuring Deeptrack platforms meet enterprise-grade usability and regulator-aware standards.',
  },
];

const advisors = [
  {
    name: 'Russel Okoth',
    title: 'Principal Cybersecurity & Privacy Advisor',
    img: '/people/russell.jpg',
    link: 'https://www.linkedin.com/in/russellokoth/',
  },
  {
    name: 'Sammy Deprez',
    title: 'Advisor, AI & Automation',
    img: '/people/sammy.jpg',
    link: 'https://www.linkedin.com/in/sammydeprez/',
  },
  {
    name: 'Maurice Oyundi',
    title: 'Advisor, Enterprise Technology & Public Sector',
    img: '/people/maurice.jpg',
    link: 'https://www.linkedin.com/in/maurice-oyundi-50bb7119/',
  },
  {
    name: 'Ian Lumbasio',
    title: 'Advisor, Legal, Transactions & Venture',
    img: '/people/ian.jpeg',
    link: 'https://ke.linkedin.com/in/ian-lumbasio',
  },
  {
    name: 'Brenda Gentry',
    title: 'Marketing & Expansion',
    img: '/people/brenda.jpg',
    link: 'https://www.linkedin.com/in/brenda-gentry-4b56b087/',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function LeadershipPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-gray-200">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Leadership
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Deeptrack is led by operators and advisors building verification
            infrastructure for the AI era. Our leadership combines expertise
            across cybersecurity, artificial intelligence, enterprise systems,
            financial regulation, and governance.
          </p>

          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            We operate with long-term responsibility. In high-trust systems,
            leadership is not visibility — it is accountability.
          </p>
        </div>
      </section>


      {/* Executive Leadership */}
      <section className="px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto space-y-16">

          <div>
            <h2 className="text-3xl font-medium mb-6">
              Executive Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl">
              The core operators responsible for Deeptrack’s strategic direction,
              technical execution, and institutional growth.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          >
            {executives.map((person) => (
              <motion.div
                key={person.name}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <motion.a
                  href={person.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full aspect-square rounded-2xl overflow-hidden group"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  {/* IMAGE ZOOM */}
                  <motion.div
                    className="absolute inset-0"
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.05 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </motion.a>


                {/* TEXT */}
                <h3 className="mt-6 text-lg text-gray-900">
                  {person.name}
                </h3>

                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {person.title}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {person.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Advisors & Governance */}
      <section className="bg-gray-50 px-6 md:px-12 lg:px-24 py-24 border-t border-gray-200">
        <div className="max-w-6xl mx-auto space-y-16">

          <div>
            <h2 className="text-3xl font-medium mb-6">
              Advisors & Governance
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Deeptrack works with senior advisors across cybersecurity,
              legal systems, venture capital, enterprise technology, and
              public sector institutions. Their oversight strengthens our
              regulatory alignment, risk management, and long-term architecture decisions.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {advisors.map((person) => (
              <motion.div
                key={person.name}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-2xl p-6 flex flex-col items-center text-center"
              >
                {/* IMAGE CONTAINER */}
                <motion.a
                  href={person.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full aspect-square rounded-2xl overflow-hidden group"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  {/* IMAGE ZOOM */}
                  <motion.div
                    className="absolute inset-0"
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.05 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  {/* GLASS TOOLTIP */}
                  <motion.div
                    variants={{
                      rest: { opacity: 0, y: 10, scale: 0.95 },
                      hover: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
                  >
                    <div className="relative px-4 py-2 rounded-xl 
                        backdrop-blur-md bg-gray-900/50 
                        border border-white/30 
                        text-white text-xs font-medium 
                        shadow-lg whitespace-nowrap">
                      View LinkedIn profile
                    </div>
                  </motion.div>
                </motion.a>


                {/* TEXT */}
                <h3 className="mt-6 text-lg text-gray-900">
                  {person.name}
                </h3>

                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {person.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Leadership Principles */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto space-y-12 text-center">

          <h2 className="text-3xl font-medium">
            Leadership Principles
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div>
              <h4 className="font-medium mb-2">Security First</h4>
              <p className="text-gray-600 text-sm">
                Every architectural decision prioritizes resilience and defense.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Privacy by Architecture</h4>
              <p className="text-gray-600 text-sm">
                Systems are designed to minimize exposure and protect sensitive data by default.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Regulator-Aware Design</h4>
              <p className="text-gray-600 text-sm">
                Infrastructure aligned with financial, legal, and public sector standards.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Long-Term Infrastructure Thinking</h4>
              <p className="text-gray-600 text-sm">
                Built for durability, not short-term visibility.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Global Responsibility</h4>
              <p className="text-gray-600 text-sm">
                Truth infrastructure must serve both emerging and advanced digital economies.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main >
  );
}