import ResourcesCard from "./ResourceSideBar";


export default function TrustSideBar() {
  return (
    <aside className="w-80 bg-white border-r p-6 space-y-8 overflow-y-auto">
      {/* Compliance */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase">
          Compliance
        </h2>

        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">SOC 2</p>
        </div>
      </div>

      {/* Resources Card inserted here */}
      <ResourcesCard />
    </aside>
  );
}