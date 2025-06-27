"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EventBookingSidebar({
  price,
  tickets,
}: {
  price: number;
  tickets: number;
}) {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${price.toFixed(2)}
            </div>
            <p className="text-gray-600">per ticket</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of tickets
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTicketQuantity(Math.max(1, ticketQuantity - 1))
                  }
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-8 text-center">
                  {ticketQuantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTicketQuantity(Math.min(10, ticketQuantity + 1))
                  }
                  disabled={ticketQuantity >= tickets}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Subtotal ({ticketQuantity} ticket
                  {ticketQuantity > 1 ? "s" : ""})
                </span>
                <span>${(price * ticketQuantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Service fee</span>
                <span>${0}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>${(price * ticketQuantity).toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
              Buy Tickets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
