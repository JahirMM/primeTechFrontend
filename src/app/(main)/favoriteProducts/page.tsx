import FavoriteProductsList from "@/favoriteProduct/components/FavoriteProductsList";

function page() {
  return (
    <main className="px-10 mt-20">
      <h1 className="mb-10 text-3xl font-bold">Mis productos favoritos</h1>
      <FavoriteProductsList />
    </main>
  );
}

export default page;
