import { EventCard } from "@/components/shared/events/event-card";
import { Input } from "@/components/ui/input";
import { getEventsAction } from "@/lib/actions/event";
import { EventWithImages } from "@/types";
import { Search } from "lucide-react";

export default async function EventsPage() {
  const allEvents: EventWithImages[] = await getEventsAction();

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Events
          </h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
        </div>

        {allEvents.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No events found.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEvents.map((event: EventWithImages) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
