import { getDbConnected } from "@/lib/db";
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}
const stripe = new Stripe(stripeSecretKey);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const POST = async (req: NextRequest) => {
  try {
    const dbConnectionValid = await getDbConnected();
    console.log("[DEBUG] Database connection validation:", {
      dbConnectionValid,
    });
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig || !endpointSecret) {
      throw new Error("Missing Stripe signature or endpoint secret");
    }

    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });

        break;
      case "customer.subscription.deleted":
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;
        await handleSubscriptionDeleted({ subscriptionId, stripe });
        console.log("Customer Subscription Deleted:", subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({
      status: "success",
      message: "Webhook received",
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
};
