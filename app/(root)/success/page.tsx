import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <div className="flex-1 flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-2" />
          <CardTitle className="text-2xl font-bold">Success!</CardTitle>
          <CardDescription>
            Your action was completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-700">Thank you for using TickEvent.</p>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
