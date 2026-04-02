import path from "path";
import { validateAgainstSchema } from "../../lib/validator.js";
import { adssToSisMap } from "./toSisMap.js";
import { gapAnalysis } from "./gapAnalysis.js";
import { explainAdssSystem } from "./explainSystem.js";

export async function fullAnalysis(system: unknown) {
  const schemaPath = path.resolve(
    process.cwd(),
    "schemas/adss-v0.1.schema.json"
  );

  // 1. Validate
  const validation = await validateAgainstSchema(schemaPath, system);

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

  // 2. Mapping
  const mappingResult = await adssToSisMap(system as any);
  const mapping = JSON.parse(mappingResult.content[0].text);

  // 3. Gap analysis
  const gapResult = await gapAnalysis(system as any);
  const gaps = JSON.parse(gapResult.content[0].text);

  // 4. Explanation
  const explainResult = await explainAdssSystem(system as any);
  const explanation = explainResult.content[0].text;

  // 5. Coherence score (basic for now)
  const coherenceScore = gaps.score;

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            valid: true,
            mapping,
            gaps,
            system_explanation: explanation,
            coherence_score: coherenceScore,
          },
          null,
          2
        ),
      },
    ],
  };
}