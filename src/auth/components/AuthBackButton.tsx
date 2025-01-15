import ArrowIcon from "@/icons/ArrowIcon";
import Link from "next/link";

function AuthBackButton() {
  return (
    <Link href={"/"} className="flex items-center gap-x-3">
      <span className="p-2 rounded-full bg-secondaryColor">
        <ArrowIcon className="rotate-180 size-3" />
      </span>
      <span className="text-xs">Volver</span>
    </Link>
  );
}

export default AuthBackButton;
