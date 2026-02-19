import { Navbar } from "@/components/landingPage/navs/navBar";
import CompanyCulture from "@/components/layout/companyCulture";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | deeptrack</title>
        <meta name="description" content="Learn about deeptrack's mission, vision, product stack and leadership team." />
        <link rel="canonical" href="https://www.deeptrack.io/about-us" />
      </Head>

      <div className="space-y-6">
        <Navbar />
        <CompanyCulture />
      </div>
    </>
  );
}