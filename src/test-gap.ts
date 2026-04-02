import { gapAnalysis } from "./tools/adss/gapAnalysis.js";

const system = {
  flows: [
    {
      name: "Flow 1",
      nodes: [
        {
          node_id: "1",
          node_type: "decision",
          name: "Decision without SIS",
        }
      ]
    }
  ]
};

async function run() {
  const result = await gapAnalysis(system);
  console.log(result.content[0].text);
}

run();