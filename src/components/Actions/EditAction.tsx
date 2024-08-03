import { Tooltip } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const EditAction = ({ id, url }: { id: string; url?: string }) => {
  const pathname = usePathname();
  const href = url ?? pathname;
  return (
    <Tooltip content="Редактировать" className="bg-yellow-200">
      <Link href={`${href}/edit/${id}`}>
        <Pencil fill="#fef08a" />
      </Link>
    </Tooltip>
  );
};
