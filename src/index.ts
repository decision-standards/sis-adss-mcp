import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { getSisSchema } from "./tools/sis/getSchema.js";
import { getAdssSchema } from "./tools/adss/getSchema.js";
import { mapDecisionPoints } from "./tools/adss/mapDecisionPoints.js";
import { validateAdssSystem } from "./tools/adss/validateSystem.js";
import { validateSisPayload } from "./tools/sis/validatePayload.js";
import { adssToSisMap } from "./tools/adss/toSisMap.js";
import { explainSisDecision } from "./tools/sis/explainDecision.js";
import { explainAdssSystem } from "./tools/adss/explainSystem.js";
import { validateAndMapAdss } from "./tools/adss/validateAndMap.js";
import { gapAnalysis } from "./tools/adss/gapAnalysis.js";
import { fullAnalysis } from "./tools/adss/fullAnalysis.js";
import { registerResources } from "./resources/registerResources.js";

async function main() {
  const server = new McpServer({
    name: "sis-adss-mcp",
    version: "0.1.0",
  });

  // ✅ NEW TOOL REGISTRATION PATTERN
  server.registerTool(
    "sis.get_schema",
    {
      description: "Retrieve the SIS schema by version",
      inputSchema: z.object({
        version: z.string().optional(),
      }),
    },
    async ({ version }) => {
      return await getSisSchema(version ?? "0.2");
    }
  );
  server.registerTool(
    "adss.get_schema",
    {
      description: "Retrieve the ADSS schema by version",
      inputSchema: z.object({
        version: z.string().optional(),
      }),
    },
    async ({ version }) => {
      return await getAdssSchema(version ?? "0.1");
    }
  );
  server.registerTool(
    "adss.map_decision_points",
    {
      description: "Extract all decision nodes and their SIS references from an ADSS system definition",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await mapDecisionPoints(system);
    }
  );
  // keep ping (updated too)
  server.registerTool(
    "ping",
    {
      description: "Health check",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [{ type: "text", text: "sis-adss-mcp is running" }],
    })
  );
  server.registerTool(
    "adss.validate_system",
    {
      description: "Validate an ADSS system against the ADSS schema",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await validateAdssSystem(system);
    }
  );
  server.registerTool(
    "sis.validate_payload",
    {
      description: "Validate a SIS payload against the SIS schema",
      inputSchema: z.object({
        payload: z.any(),
      }),
    },
    async ({ payload }) => {
      return await validateSisPayload(payload);
    }
  );
  server.registerTool(
    "adss.to_sis_map",
    {
      description: "Convert an ADSS system into required SIS decision contracts",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await adssToSisMap(system);
    }
  );
  server.registerTool(
    "sis.explain_decision",
    {
      description: "Generate a human-readable explanation of a SIS decision",
      inputSchema: z.object({
        payload: z.any(),
      }),
    },
    async ({ payload }) => {
      return await explainSisDecision(payload);
    }
  );
  server.registerTool(
    "adss.explain_system",
    {
      description: "Generate a human-readable explanation of an ADSS system",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await explainAdssSystem(system);
    }
  );
  server.registerTool(
    "adss.validate_and_map",
    {
      description:
        "Validate an ADSS system and extract required SIS decision contracts",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await validateAndMapAdss(system);
    }
  );
  server.registerTool(
    "adss.gap_analysis",
    {
      description: "Analyze an ADSS system for structural and decision gaps",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await gapAnalysis(system);
    }
  );
  server.registerTool(
    "adss.full_analysis",
    {
      description:
        "Full analysis of an ADSS system including validation, mapping, gaps, and explanation",
      inputSchema: z.object({
        system: z.any(),
      }),
    },
    async ({ system }) => {
      return await fullAnalysis(system);
    }
  );
  registerResources(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
 
main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});