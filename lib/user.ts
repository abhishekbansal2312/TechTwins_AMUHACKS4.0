import { plans } from "@/utils/constants";
import { getDbConnected } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

interface UploadLimitResponse {
  hasReachedLimit: boolean;
  uploadLimit: number;
}
export async function getPriceId(email: string) {
  if (!email) {
    return null;
  }

  const sql = await getDbConnected();
  const query = await sql`
    SELECT price_id FROM users WHERE email = ${email} AND status = 'active'
  `;

  if (!query || query.length === 0) {
    return null;
  }

  return query[0]?.price_id || null;
}

export async function hasReachedUploadLimit(
  userId: string
): Promise<UploadLimitResponse | null> {
  const user = await currentUser();
  if (!user?.id) return null;

  const email = user?.emailAddresses?.[0]?.emailAddress;
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceId(email);

  const isProPlan = Boolean(
    plans.find((plan) => plan.priceId === priceId)?.id === "pro"
  );

  const uploadLimit: number = isProPlan ? 1000 : 5;

  console.log(uploadCount, uploadLimit);

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}
export async function hasActivePlan(email: string) {
  try {
    const sql = await getDbConnected();

    const query = await sql`
      SELECT price_id, status 
      FROM users 
      WHERE email = ${email} 
      AND status = 'active' 
      AND price_id IS NOT NULL
    `;

    return query && query.length > 0;
  } catch (error) {
    return false;
  }
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );
  return hasSubscription;
}
