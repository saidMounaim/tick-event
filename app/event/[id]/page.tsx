/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBookingSidebar } from "@/components/shared/events/event-booking-sidebar";
import { EventDescription } from "@/components/shared/events/event-description";
import { EventImages } from "@/components/shared/events/event-images";
import { EventInfoCards } from "@/components/shared/events/event-info-cards";
import { getEventByIdAction } from "@/lib/actions/event";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event: any = await getEventByIdAction(id);
  if (!event) notFound();

  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <EventImages
              featuredImage={event.featuredImage}
              additionalImages={event.additionalImages}
              title={event.title}
            />
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <EventInfoCards
              date={event.date.toDateString()}
              location={event.location}
              tickets={event.tickets}
              price={Number(event.price)}
            />
            <EventDescription description={event.description} />
          </div>
          <div>
            <EventBookingSidebar
              price={Number(event.price)}
              tickets={event.tickets}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
