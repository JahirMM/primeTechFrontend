import Link from "next/link";

function AuthHeader() {
  return (
    <header className="absolute top-2 left-10 md:top-10">
      <Link href={"/"} className="text-lg font-bold scale-100" aria-label="PrimeTech">
        PrimeTech
      </Link>
    </header>
  );
}

export default AuthHeader;
