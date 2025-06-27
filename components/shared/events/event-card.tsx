import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EventTypes } from "@/types";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: EventTypes;
  showBookButton?: boolean;
}

export function EventCard({ event, showBookButton = true }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={event.featuredImage as string}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          fill
        />
      </div>
      <CardContent className="px-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {formatDate(event.date.toDateString())}
          </span>
        </div>
        {event.location && (
          <p className="text-sm text-gray-600 mb-4">{event.location}</p>
        )}
        <div className="text-2xl font-bold text-blue-600">
          ${event.price.toFixed(2)}
        </div>
      </CardContent>
      {showBookButton && (
        <CardFooter className="p-6 pt-0">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <Link
              href={`/events/${event.id}`}
              className="flex items-center justify-center"
            >
              View details
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
