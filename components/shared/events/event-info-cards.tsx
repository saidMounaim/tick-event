import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Calendar, Users } from "lucide-react";

export function EventInfoCards({
  date,
  location,
  tickets,
  price,
}: {
  date: string | Date;
  location?: string;
  tickets: number;
  price: number;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-0">
        <CardContent className="p-4 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold">Event Date</p>
            <p className="text-sm text-gray-600">{date.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="p-4 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold">Location</p>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="p-4 flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold">Available Tickets</p>
            <p className="text-sm text-gray-600">{tickets} remaining</p>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="p-4 flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold">Price per ticket</p>
            <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
