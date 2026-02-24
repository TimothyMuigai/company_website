export default function DataCollectedCard() {
  const items = [
    "Customer personally identifiable information",
    "Employee personally identifiable information",
    "Credit card information",
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      <ul className="space-y-3 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-gray-400">✕</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}