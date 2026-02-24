interface Props {
  name: string;
  description: string;
}

export default function SubprocessorItem({ name, description }: Props) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-none">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}