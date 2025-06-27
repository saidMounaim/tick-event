import { EventCard } from "@/components/shared/events/event-card";
import { EventsSearch } from "@/components/shared/events/events-search";
import { getEventsAction } from "@/lib/actions/event";
import { EventWithImages } from "@/types";

interface EventsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const currSearchParams = await searchParams;
  const query = currSearchParams.query || "";
  const allEvents: EventWithImages[] = await getEventsAction(query);

  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Events
          </h1>
          <EventsSearch />
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
    </div>
  );
}
