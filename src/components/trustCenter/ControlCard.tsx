interface Props {
  title: string;
  items: string[];
}

export default function ControlCard({ title, items }: Props) {
  return (
    <div className="bg-white rounded-xl border p-6 hover:shadow-sm transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-gray-400">{">"}</span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-500 mt-1">●</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}