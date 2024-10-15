/** @type {import("@proofgeist/fmdapi/dist/utils/typegen/types.d.ts").GenerateSchemaOptions} */
export const config = {
  clientSuffix: "Layout",
  schemas: [
    {
      layout: "api.TCD__TimeCard",
      schemaName: "TCDDelete",
      valueLists: "allowEmpty",
    },
  ],
  cleanOldFiles: true,
  path: "./src/config/schemas/filemaker",
};
