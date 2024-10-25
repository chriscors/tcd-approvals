"use server";

import {
  timecardLayout,
  timecardlineLayout,
} from "@/config/schemas/filemaker/client";
import { runFMScript } from "@/server/fms";
import { errorObject, fmsScripts } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function approveTimecard(tcdId: string) {
  try {
    const result = await runFMScript(fmsScripts.submitApproval.name, {
      tcdId,
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

export async function declineTimecard(tcdId: string, note: string) {
  try {
    const result = await runFMScript(fmsScripts.submitApproval.name, {
      tcdId,
      action: "decline",
      note,
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
    console.error("Error declining timecard:", error);
    return { success: false, error: "Failed to decline timecard" };
  }
}

export async function getTimecard(tcdId: string) {
  try {
    const { data: tclData } = await timecardlineLayout.find({
      query: [{ _timecard_id: tcdId, isPay: "1" }],
      fetch: { next: { revalidate: 0 } },
    });
    const { data: tcdData } = await timecardLayout.findFirst({
      query: [{ __id: tcdId }],
      fetch: { next: { revalidate: 0 } },
    });
    console.log(tclData, tcdData);

    return { tclData, tcdData };
  } catch (error) {
    console.error("Error getting timecard:", error);
    return { success: false, error: "Failed to get timecard" };
  }
}
