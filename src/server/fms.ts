import { InboxLayout } from "@/config/schemas/filemaker/client";
import { InboxScriptName } from "@/utils/constants";
export async function runFMScript(
  scriptName: string,
  input: unknown
): Promise<unknown> {
  const { scriptResult } = await InboxLayout.create({
    fieldData: {
      inboxPayload: JSON.stringify(input),
      scriptName,
    },
    script: InboxScriptName,
  });
  if (!scriptResult) return null;
  try {
    return JSON.parse(scriptResult);
  } catch {
    return scriptResult;
  }
}
