import { mapDecisionPoints } from "./tools/adss/mapDecisionPoints.js";

const testSystem = {
  name: "Test System",
  flows: [
    {
      flow_id: "flow1",
      name: "Test Flow",
      nodes: [
        {
          node_id: "n1",
          node_type: "stage",
          name: "Stage 1",
        },
        {
          node_id: "n2",
          node_type: "decision",
          name: "Decision 1",
          sis_ref: {
            intent_type: "offer_decision",
            schema_version: "0.2.0",
          },
        },
      ],
    },
  ],
};

async function run() {
  const result = await mapDecisionPoints(testSystem);
  console.log(result.content[0].text);
}

run();