/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLatestEventsAction } from "@/lib/actions/event";
import { EventCard } from "../events/event-card";
import { EventTypes } from "@/types";

export async function LatestEvents() {
  const events: any = await getLatestEventsAction(3);
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Events
          </h2>
          <p className="text-lg text-gray-600">
            {"Don't miss out on these amazing upcoming events"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: EventTypes) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
