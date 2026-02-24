interface Props {
  title: string;
  badge?: string;
  link?: string;
}

export default function SectionHeader({ title, badge, link }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        {badge && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {link && (
        <button className="text-sm text-blue-600 hover:underline">
          {link}
        </button>
      )}
    </div>
  );
}