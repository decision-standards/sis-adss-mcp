type AdssNode = {
    node_id?: string;
    node_type?: string;
    name?: string;
    sis_ref?: {
      intent_type?: string;
      schema_version?: string;
      profile?: string;
      notes?: string;
    };
  };
  
  type AdssFlow = {
    flow_id?: string;
    name?: string;
    nodes?: AdssNode[];
  };
  
  type AdssSystem = {
    name?: string;
    flows?: AdssFlow[];
  };
  
  export async function mapDecisionPoints(system: AdssSystem) {
    const results: Array<{
      flow_id?: string;
      flow_name?: string;
      node_id?: string;
      node_name?: string;
      sis_ref?: AdssNode["sis_ref"];
    }> = [];
  
    for (const flow of system.flows ?? []) {
      for (const node of flow.nodes ?? []) {
        if (node.node_type === "decision") {
          results.push({
            flow_id: flow.flow_id,
            flow_name: flow.name,
            node_id: node.node_id,
            node_name: node.name,
            sis_ref: node.sis_ref,
          });
        }
      }
    }
  
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              system_name: system.name ?? null,
              decision_points: results,
              count: results.length,
            },
            null,
            2
          ),
        },
      ],
    };
  }