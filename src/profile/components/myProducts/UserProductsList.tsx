import UserProduct from "./UserProduct";

function UserProductsList() {
  return (
    <div className="flex flex-col gap-y-20">
      <article className="p-4 border border-gray-300 rounded-xl">
        <UserProduct />
      </article>
    </div>
  );
}

export default UserProductsList;
