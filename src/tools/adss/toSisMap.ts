type AdssNode = {
    node_id?: string;
    node_type?: string;
    name?: string;
    sis_ref?: {
      intent_type?: string;
      schema_version?: string;
      profile?: string;
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
  
  export async function adssToSisMap(system: AdssSystem) {
    const sisContracts: Array<{
      intent_type?: string;
      schema_version?: string;
      source_flow?: string;
      node_id?: string;
      node_name?: string;
    }> = [];
  
    for (const flow of system.flows ?? []) {
      for (const node of flow.nodes ?? []) {
        if (node.node_type === "decision" && node.sis_ref) {
          sisContracts.push({
            intent_type: node.sis_ref.intent_type,
            schema_version: node.sis_ref.schema_version,
            source_flow: flow.name,
            node_id: node.node_id,
            node_name: node.name,
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
              required_sis_contracts: sisContracts,
              count: sisContracts.length,
            },
            null,
            2
          ),
        },
      ],
    };
  }