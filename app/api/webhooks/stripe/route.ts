import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;

    if (!metadata) return NextResponse.json({ received: true });

    const { userId, eventId, quantity } = metadata;
    console.log(userId, eventId, quantity);

    try {
      await prisma.order.create({
        data: {
          userId,
          eventId,
          quantity: parseInt(quantity),
          totalAmount: Number(session.amount_total),
          paymentStatus: "paid",
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
        },
      });
    } catch (err) {
      console.error("Order creation failed", err);
    }
  }

  return NextResponse.json({ received: true });
}
