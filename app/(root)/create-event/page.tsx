import { CreateEventForm } from "@/components/shared/forms/create-event-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Create New Event
            </CardTitle>
            <CardDescription>
              Fill in the details to create your event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CreateEventForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
