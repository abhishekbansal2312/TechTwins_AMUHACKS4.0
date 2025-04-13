"use server";

import { currentUser } from "@clerk/nextjs/server";
import { getDbConnected } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not authenticated.");
    }

    const sql = await getDbConnected();
    const result = await sql`
      DELETE FROM pdf_summaries
      WHERE id = ${summaryId} AND user_id = ${userId}
      RETURNING id;
    `;

    if (result.length > 0) {
      revalidatePath("/dashboard"); // Only valid for App Router
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return { success: false, error: error };
  }
}
