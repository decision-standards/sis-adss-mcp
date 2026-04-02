import { adssToSisMap } from "./tools/adss/toSisMap.js";

const system = {
  name: "Retention Flow",
  flows: [
    {
      name: "Flow 1",
      nodes: [
        {
          node_id: "1",
          node_type: "decision",
          name: "Offer Decision",
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
  const result = await adssToSisMap(system);
  console.log(result.content[0].text);
}

run();