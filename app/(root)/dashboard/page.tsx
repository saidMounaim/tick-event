import { EventCard } from "@/components/shared/events/event-card";
import { EventDelete } from "@/components/shared/events/event-delete";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserEventsAction } from "@/lib/actions/event";
import {
  getTotalRevenueByUser,
  getTotalTicketsSoldByUser,
} from "@/lib/actions/order";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");

  const [userEvents, ticketsSold, totalRevenue] = await Promise.all([
    getUserEventsAction(session.user?.id),
    getTotalTicketsSoldByUser(session.user?.id),
    getTotalRevenueByUser(session.user?.id),
  ]);
  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || "User"}!
          </h1>
          <p className="text-gray-600">
            Manage your events and discover new ones
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Events
              </h2>
              <Link href="/create-event">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Event
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {userEvents.map((event) => (
                <div key={event.id} className="relative">
                  <EventCard event={event} />
                  <EventDelete eventId={event.id} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Your event overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Events</span>
                  <span className="font-semibold">{userEvents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tickets Sold</span>
                  <span className="font-semibold">{ticketsSold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-semibold">
                    ${totalRevenue.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
