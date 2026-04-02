import path from "path";
import { validateAgainstSchema } from "../../lib/validator.js";

export async function validateSisPayload(payload: unknown) {
  const schemaPath = path.resolve(
    process.cwd(),
    "schemas/sis-v0.2.schema.json"
  );

  const result = await validateAgainstSchema(schemaPath, payload);

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      },
    ],
    isError: !result.valid,
  };
}