'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Scale, Lock, Cpu } from 'lucide-react';

const leadership = [
  {
    name: 'Bryan Koyundi',
    title: 'Founder',
    img: '/people/bryan.jpg',
    link: "https://www.linkedin.com/in/bryane-fundraising-to-build-deeptrack-6a215a282"
  },
  {
    name: 'Isaak Hayes',
    title: 'Product Strategy & User Experience',
    img: '/people/hayes.jpg',
    link: "https://www.linkedin.com/in/isaakhayes/",
  },
  {
    name: 'Russel Okoth',
    title: 'Principal Cybersecurity advisor and Privacy',
    img: '/people/russell.jpg',
    link: "https://www.linkedin.com/in/russellokoth/",
  },
  {
    name: 'Sammy Deprez',
    title: 'Pricipal Advisor on AI and Automation',
    img: '/people/sammy.jpg',
    link: "https://www.linkedin.com/in/sammydeprez/",
  },
  {
    name: 'MauriceOyundi',
    title: 'Advisor, Enterprise Technology & Public Sector Solutions',
    img: '/people/maurice.jpg',
    link: "https://www.linkedin.com/in/maurice-oyundi-50bb7119/"
  },
  {
    name: 'Ian Lumbasio',
    title: 'Advisor, Legal, Transactions & Venture Capital',
    img: '/people/ian.jpeg',
    link: "https://ke.linkedin.com/in/ian-lumbasio"
  },
  {
    name: 'Brenda Gentry',
    title: 'Marketing and Expansion ',
    img: '/people/brenda.jpg',
    link: "https://www.linkedin.com/in/brenda-gentry-4b56b087/"
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

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

export default function CompanyCulture() {
  return (

    <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 max-w-7xl mx-auto space-y-24 text-black">

      {/* ------------------------------------------------ */}
      {/* OVERVIEW */}
      {/* ------------------------------------------------ */}

      <section className="flex flex-col md:flex-row lg:flex-row items-center gap-12 pt-6">
        <div className='flex-1 space-y-6'>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
            Company & Culture
          </h1>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Deeptrack operates as an institutional grade verification
              infrastructure company serving regulated and high trust sectors.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our culture reflects how we build: security first,
              regulator aware, and engineered for long term resilience.
            </p>
          </div>
        </div>
        <div className=" lg:block flex-1">
          <Image
            src="/Rectangle 28.png"
            alt="Team Culture"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* OPERATING PRINCIPLES */}
      {/* ------------------------------------------------ */}

      <section className="grid md:grid-cols-2 gap-12">

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          <ShieldCheck className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-light">Security First Engineering</h2>
          <p className="text-gray-600">
            Systems are built with adversarial resilience in mind.
            We assume hostile conditions and engineer accordingly.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          <Scale className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-light">Regulatory Awareness</h2>
          <p className="text-gray-600">
            Compliance readiness and governance alignment
            are embedded into our architecture from inception.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          <Lock className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-light">Institutional Accountability</h2>
          <p className="text-gray-600">
            Trust is earned through auditability,
            transparency, and privacy-first infrastructure.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          <Cpu className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-light">Long-Term Infrastructure Thinking</h2>
          <p className="text-gray-600">
            We design foundational systems intended
            to outlast technology cycles and market shifts.
          </p>
        </motion.div>

      </section>

      {/* Leadership */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Company Leadership
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {leadership.map(({ name, title, img, link }) => (
            <motion.div
              key={name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="rounded-2xl p-6 flex flex-col items-center text-center"
            >
              {/* IMAGE CONTAINER */}
              <motion.a
                href={link}
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
                    src={img}
                    alt={name}
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
                {name}
              </h3>

              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </main>
  );
}