import path from "path";
import { validateAgainstSchema } from "../../lib/validator.js";

export async function validateAdssSystem(system: unknown) {
  const schemaPath = path.resolve(
    process.cwd(),
    "schemas/adss-v0.1.schema.json"
  );

  const result = await validateAgainstSchema(schemaPath, system);

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
