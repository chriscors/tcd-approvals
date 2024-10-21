"use server";

import { runFMScript } from "@/server/fms";
import { errorObject, fmsScripts } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function approveTimecard(timecardId: string) {
  try {
    const result = await runFMScript(fmsScripts.submitApproval.name, {
      tcdId: timecardId,
      action: "approve",
    });
    const parsedResult = errorObject.safeParse(result);

    if (!parsedResult.success) {
      console.error("Invalid error object:", parsedResult.error);
      return { success: false, error: "Invalid response from FM Script" };
    }

    if (parsedResult.data.error.code !== 0) {
      return { success: false, error: parsedResult.data.error.text };
    }

    // If we reach here, the result is valid and the code is 0
    revalidatePath("/approve/[timecard_id]");
    return { success: true };
  } catch (error) {
    console.error("Error approving timecard:", error);
    return { success: false, error: "Failed to approve timecard" };
  }
}
