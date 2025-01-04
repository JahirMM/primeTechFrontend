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
    <div className="flex gap-3 justify-center pt-5 mb-6">
      {categoryItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="bg-primaryColor text-sm text-white/90 px-4 py-2 rounded-lg"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default Categories;
