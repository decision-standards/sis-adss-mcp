import path from "path";
import { validateAgainstSchema } from "../../lib/validator.js";
import { adssToSisMap } from "./toSisMap.js";

export async function validateAndMapAdss(system: unknown) {
  const schemaPath = path.resolve(
    process.cwd(),
    "schemas/adss-v0.1.schema.json"
  );

  // 1. Validate ADSS system
  const validation = await validateAgainstSchema(schemaPath, system);

  // 2. If invalid, return early
  if (!validation.valid) {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              valid: false,
              errors: validation.errors,
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }

  // 3. Map SIS contracts
  const mapping = await adssToSisMap(system as any);

  const mapped = JSON.parse(mapping.content[0].text);

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            valid: true,
            system_name: mapped.system_name,
            required_sis_contracts: mapped.required_sis_contracts,
            contract_count: mapped.count,
          },
          null,
          2
        ),
      },
    ],
  };
}