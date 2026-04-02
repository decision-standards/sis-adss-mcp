type AdssNode = {
    node_type?: string;
    name?: string;
  };
  
  type AdssFlow = {
    name?: string;
    nodes?: AdssNode[];
  };
  
  type AdssSystem = {
    name?: string;
    objective?:
      | string
      | {
          title?: string;
          success_metric?: string;
          target?: string;
          time_horizon?: string;
        };
    flows?: AdssFlow[];
  };
  
  export async function explainAdssSystem(system: AdssSystem) {
    const systemName = system.name ?? "Unnamed System";
  
    const objective =
      typeof system.objective === "string"
        ? system.objective
        : system.objective?.title ?? "No objective defined";
  
    const flowSummaries =
      system.flows?.map((flow, index) => {
        const steps =
          flow.nodes?.map((node) => {
            return `- ${node.node_type}: ${node.name ?? "Unnamed node"}`;
          }) ?? [];
  
        return `
  Flow ${index + 1}: ${flow.name ?? "Unnamed Flow"}
  ${steps.join("\n")}
  `.trim();
      }) ?? [];
  
    const explanation = `
  System Overview
  ----------------
  System: ${systemName}
  
  Objective:
  ${objective}
  
  Flows:
  ${flowSummaries.join("\n\n")}
  
  Interpretation:
  This system coordinates multiple steps to achieve the stated objective.
  Decision nodes determine when actions should occur, while other nodes
  support execution, evaluation, or data movement across the system.
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