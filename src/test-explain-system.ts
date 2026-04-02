import { explainAdssSystem } from "./tools/adss/explainSystem.js";

const system = {
  name: "Retention System",
  objective: "Reduce member attrition",
  flows: [
    {
      name: "Detection Flow",
      nodes: [
        { node_type: "input", name: "Member Activity" },
        { node_type: "decision", name: "Attrition Risk Check" },
        { node_type: "action", name: "Trigger Offer" },
      ],
    },
  ],
};

async function run() {
  const result = await explainAdssSystem(system);
  console.log(result.content[0].text);
}

run();