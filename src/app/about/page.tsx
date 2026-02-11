import { Navbar } from "@/components/landingPage/navs/navBar";

export default function About() {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">About</h1>
      </div>
    </>
  );
}