import Stripe from "stripe";
import { getDbConnected } from "./db";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const sql = await getDbConnected();

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;

    console.log("Subscription Cancelled SUCCEED");
  } catch (error) {
    console.error("Error handling subscription deleted", error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  try {
    console.log("Checkout session completed", session);
    const completeSession = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["line_items"],
      }
    );

    const customerId = completeSession.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = completeSession.line_items?.data[0]?.price?.id;

    if (customer && "email" in customer && priceId) {
      const { email, name } = customer as { email: string; name?: string };

      await createOrUpdateUser({
        email: email as string,
        fullName: name || "Unknown",
        customerId,
        priceId: priceId as string,
        status: "active",
      });

      await createPayment({
        session: completeSession,
        priceId: priceId as string,
        userEmail: email as string,
      });

      console.log("User created or updated successfully");
    } else {
      console.error("Missing customer email or priceId");
    }
  } catch (error) {
    console.error("Error handling checkout session:", error);
  }
}

async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const sql = await getDbConnected();
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status) 
        VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
      `;
      console.log("User created successfully");
    } else {
      await sql`
        UPDATE users 
        SET full_name = ${fullName}, customer_id = ${customerId}, price_id = ${priceId}, status = ${status}
        WHERE email = ${email}
      `;
      console.log("User updated successfully");
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
  }
}

export async function createPayment({
  session,
  priceId,
  userEmail,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const sql = await getDbConnected();
    const amountTotal = session.amount_total || 0; // Ensure a valid amount
    const paymentId = session.id; // Stripe Payment ID
    const paymentStatus = session.status;

    await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) 
      VALUES (${amountTotal}, ${paymentStatus}, ${paymentId}, ${priceId}, ${userEmail})
    `;

    console.log("Payment recorded successfully");
  } catch (error) {
    console.error("Error creating payment:", error);
  }
}
