import { validateSisPayload } from "./tools/sis/validatePayload.js";

const testPayload = {
  intent_id: "550e8400-e29b-41d4-a716-446655440000",
  schema_version: "0.2.0",
  intent_type: "offer_decision",
  created_at: "2026-04-02T18:00:00Z",
  source: {
    system: "test-system"
  },
  objective: {
    title: "Increase conversions",
    success_metric: "conversion_rate"
  },
  actions: [
    {
      action_id: "a987fbc9-4bed-3078-cf07-9141ba07c9f3",
      action_type: "show_offer"
    }
  ],
  constraints: [
    {
      type: "eligibility",
      rule: "credit_score > 680",
      severity: "block",
      scope: "action"
    }
  ],
  context: {
    trigger: {
      type: "mobile_login"
    }
  }
};

async function run() {
  const result = await validateSisPayload(testPayload);
  console.log(result.content[0].text);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});