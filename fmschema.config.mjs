/** @type {import("@proofgeist/fmdapi/dist/utils/typegen/types.d.ts").GenerateSchemaOptions} */
export const config = {
  clientSuffix: "Layout",
  schemas: [
    {
      layout: "next.TCD__TimeCard",
      schemaName: "timecard",
      valueLists: "allowEmpty",
    },
    {
      layout: "next.TCL__TimeCardLine",
      schemaName: "timecardline",
      valueLists: "allowEmpty",
    },
    { layout: "WebInbox", schemaName: "Inbox", valueLists: "allowEmpty" },
  ],
  cleanOldFiles: true,
  path: "./src/config/schemas/filemaker",
};
