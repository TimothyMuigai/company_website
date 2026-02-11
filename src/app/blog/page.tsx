import { Navbar } from "@/components/landingPage/navs/navBar";

export default function Blog() {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Blog & Research</h1>
      </div>
    </>
  );
}