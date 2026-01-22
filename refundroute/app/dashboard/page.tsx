export const metadata = {
  title: "Dashboard",
  description: "Protected dashboard area",
};

export default function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">You are authenticated 🎉</p>
    </main>
  );
}
