import { explainSisDecision } from "./tools/sis/explainDecision.js";

const payload = {
  intent_type: "offer_decision",
  objective: {
    title: "Increase conversion rate",
    success_metric: "conversion_rate",
  },
  actions: [
    {
      action_type: "show_offer",
    },
  ],
  constraints: [
    {
      type: "eligibility",
      rule: "credit_score > 680",
      severity: "block",
    },
  ],
  context: {
    trigger: {
      type: "mobile_login",
    },
  },
};

async function run() {
  const result = await explainSisDecision(payload);
  console.log(result.content[0].text);
}

run();