import Link from "next/link";

interface Props {
  params: { id: string };
}

export const generateMetadata = ({ params }: Props) => ({
  title: `User ${params.id}`,
  description: `Profile page for user ${params.id}`,
});

export default function UserPage({ params }: Props) {
  const { id } = params;

  return (
    <main className="p-6">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/users">Users</Link> → <span>User {id}</span>
      </nav>

      <h2 className="text-xl font-bold">User Profile</h2>
      <p className="mt-2">User ID: {id}</p>
    </main>
  );
}
