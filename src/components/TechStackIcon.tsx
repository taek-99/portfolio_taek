import Image from "next/image";

export function TechItem({
  src,
  name,
}: {
  src: string;
  name: string;
}) {


  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={src}
        alt={name}
        width={48}
        height={48}
        className="opacity-90 hover:opacity-100 transition"
      />
      <span className="text-sm text-gray-400">
        {name}
      </span>
    </div>
  );
}
