"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function EventBookingSidebar({
  price,
  tickets,
  eventId,
  userId,
  eventTitle,
  eventDate,
}: {
  price: number;
  tickets: number;
  eventId: string;
  userId: string;
  eventTitle: string;
  eventDate: Date;
}) {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const hasEventFinished = new Date(eventDate) < new Date();

  const handleCheckout = async () => {
    try {
      if (hasEventFinished) {
        toast.error(
          "You cannot purchase tickets for an event that has already finished."
        );
        return;
      }
      if (userId === "") {
        toast.error("You must be logged in to purchase tickets.");
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          eventId,
          quantity: ticketQuantity,
          price,
          eventTitle,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        toast.error("Stripe checkout session creation failed.");
      }
    } catch (err) {
      toast.error("An error occurred while processing your request.");
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <div className="mb-4 p-3 rounded bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm text-center">
            <strong>Test Mode:</strong> <br />
            <span>Do not use your real card. This is a demo environment.</span>
            <br />
            Use card <span className="font-mono">4242 4242 4242 4242</span>,
            date <span className="font-mono">12/34</span>, CVC{" "}
            <span className="font-mono">123</span> to test payments.
          </div>
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

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              onClick={handleCheckout}
            >
              Buy Tickets
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
