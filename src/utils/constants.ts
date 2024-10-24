import { z } from "zod";

export const InboxScriptName = "Run Script from Inbox";
export const errorObject = z.object({
  error: z.object({
    code: z.number(),
    environment: z.object({
      fileName: z.string(),
      layoutName: z.string(),
      scriptName: z.string(),
      scriptParameter: z.string(),
      systemPlatform: z.string(),
      systemVersion: z.string(),
    }),
    lineNumber: z.number().optional(),
    scriptName: z.string(),
    scriptStep: z.string(),
    text: z.string(),
  }),
});
export type ErrorObject = z.infer<typeof errorObject>;

export const fmsScripts = {
  submitApproval: {
    name: "Submit Approval",
    input: z.object({
      tcdId: z.string(),
      action: z.enum(["approve", "reject"]),
      comment: z.string().optional(),
    }),
    // .refine((val) => val.action === "reject" && !val.comment, {
    //   message: "Please provide a comment",
    // }),
    output: errorObject,
  },
};
