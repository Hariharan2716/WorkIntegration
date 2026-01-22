import Link from "next/link";

export const metadata = {
  title: "Users",
};

export default function UsersPage() {
  const users = [1, 2, 3];

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Users</h1>
      <ul className="mt-4 space-y-2">
        {users.map((id) => (
          <li key={id}>
            <Link className="text-blue-600 underline" href={`/users/${id}`}>
              User {id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
