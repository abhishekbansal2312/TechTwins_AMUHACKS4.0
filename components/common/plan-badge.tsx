import { getPriceId } from "@/lib/user";
import { plans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();
  if (!user?.id) return null;

  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;

  const priceId = await getPriceId(email);
  const plan = plans.find((p) => p.priceId === priceId);
  const planName = plan ? plan.name : "Buy a plan";

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 hidden lg:flex flex-row items-center",
        priceId
          ? "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300"
          : "bg-gradient-to-r from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}
