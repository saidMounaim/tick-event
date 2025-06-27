import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, eventId, quantity, price, eventTitle } = await req.json();

  if (!userId || !eventId || !quantity || !price) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(price * 100),
          product_data: {
            name: eventTitle,
          },
        },
        quantity,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    metadata: {
      userId,
      eventId,
      quantity,
    },
  });

  return NextResponse.json({ url: session.url });
}
