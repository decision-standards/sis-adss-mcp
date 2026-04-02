type SisPayload = {
    intent_type?: string;
    objective?: {
      title?: string;
      success_metric?: string;
    };
    actions?: Array<{
      action_type?: string;
    }>;
    constraints?: Array<{
      type?: string;
      rule?: string;
      severity?: string;
    }>;
    context?: {
      trigger?: {
        type?: string;
      };
    };
  };
  
  export async function explainSisDecision(payload: SisPayload) {
    const objective = payload.objective?.title ?? "No objective defined";
    const metric = payload.objective?.success_metric ?? "unknown metric";
  
    const action = payload.actions?.[0]?.action_type ?? "no action";
  
    const trigger = payload.context?.trigger?.type ?? "unknown trigger";
  
    const constraints =
      payload.constraints?.map(
        (c) => `${c.type}: ${c.rule} (${c.severity})`
      ) ?? [];
  
    const explanation = `
  Decision Summary
  ----------------
  Intent: ${payload.intent_type}
  
  Objective:
  ${objective}
  Measured by: ${metric}
  
  Trigger:
  ${trigger}
  
  Action:
  ${action}
  
  Constraints Evaluated:
  ${constraints.length > 0 ? constraints.join("\n") : "None"}
  
  Interpretation:
  This decision was generated to achieve the stated objective by executing the defined action when the trigger occurred, subject to all listed constraints.
  `.trim();
  
    return {
      content: [
        {
          type: "text" as const,
          text: explanation,
        },
      ],
    };
  }