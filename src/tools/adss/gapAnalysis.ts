type Node = {
    node_id?: string;
    node_type?: string;
    name?: string;
    sis_ref?: any;
  };
  
  type Flow = {
    name?: string;
    nodes?: Node[];
  };
  
  type System = {
    flows?: Flow[];
  };
  
  export async function gapAnalysis(system: System) {
    const missingSisBindings: any[] = [];
    const decisionWithoutContracts: any[] = [];
    const flowsWithoutDecisions: any[] = [];
    const structuralWarnings: string[] = [];
  
    let totalDecisionNodes = 0;
    let mappedDecisionNodes = 0;
  
    for (const flow of system.flows ?? []) {
      const decisions = (flow.nodes ?? []).filter(
        (n) => n.node_type === "decision"
      );
  
      if (decisions.length === 0) {
        flowsWithoutDecisions.push({
          flow: flow.name,
        });
      }
  
      for (const node of decisions) {
        totalDecisionNodes++;
  
        if (!node.sis_ref) {
          decisionWithoutContracts.push({
            node_id: node.node_id,
            flow: flow.name,
          });
        } else {
          mappedDecisionNodes++;
        }
  
        if (node.sis_ref && !node.sis_ref.intent_type) {
          missingSisBindings.push({
            node_id: node.node_id,
            issue: "missing intent_type",
          });
        }
      }
    }
  
    if (totalDecisionNodes === 0) {
      structuralWarnings.push("System has no decision nodes");
    }
  
    const score =
      totalDecisionNodes === 0
        ? 0
        : mappedDecisionNodes / totalDecisionNodes;
  
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              missing_sis_bindings: missingSisBindings,
              decision_nodes_without_contracts: decisionWithoutContracts,
              flows_without_decisions: flowsWithoutDecisions,
              structural_warnings: structuralWarnings,
              score,
            },
            null,
            2
          ),
        },
      ],
    };
  }