import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <div className="flex-1 flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome Dashboard
        </h1>
      </div>
    </div>
  );
}
