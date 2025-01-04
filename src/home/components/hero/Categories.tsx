import Link from "next/link";

function Categories() {
  const categoryItems = [
    {
      label: "Laptops",
      href: "/",
    },
    {
      label: "Tablets",
      href: "/",
    },
    {
      label: "Celulares",
      href: "/",
    },
  ];

  return (
    <div className="flex gap-3 justify-center pt-5 mb-6 md:m-0 md:p-0 md:flex-col md:relative">
      <span className="hidden md:inline md:text-md">Categorias</span>
      {categoryItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="bg-primaryColor text-center text-md text-white/90 px-4 py-2 rounded-lg text-xs lg:text-sm"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default Categories;
