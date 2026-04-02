import fs from "fs/promises";
import path from "path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerResources(server: McpServer) {
  server.registerResource(
    "sis-schema",
    "sis://schema/v0.2",
    {
      title: "SIS Schema v0.2",
      description: "Canonical SIS schema",
      mimeType: "application/json",
    },
    async () => {
      const filePath = path.resolve(
        process.cwd(),
        "schemas/sis-v0.2.schema.json"
      );
      const text = await fs.readFile(filePath, "utf-8");

      return {
        contents: [
          {
            uri: "sis://schema/v0.2",
            mimeType: "application/json",
            text,
          },
        ],
      };
    }
  );

  server.registerResource(
    "adss-schema",
    "adss://schema/v0.1",
    {
      title: "ADSS Schema v0.1",
      description: "Canonical ADSS schema",
      mimeType: "application/json",
    },
    async () => {
      const filePath = path.resolve(
        process.cwd(),
        "schemas/adss-v0.1.schema.json"
      );
      const text = await fs.readFile(filePath, "utf-8");

      return {
        contents: [
          {
            uri: "adss://schema/v0.1",
            mimeType: "application/json",
            text,
          },
        ],
      };
    }
  );

  server.registerResource(
    "sis-example",
    "sis://example/v0.2",
    {
      title: "SIS Example v0.2",
      description: "Example SIS payload",
      mimeType: "application/json",
    },
    async () => {
      const filePath = path.resolve(
        process.cwd(),
        "examples/sis-v0.2.example.json"
      );
      const text = await fs.readFile(filePath, "utf-8");

      return {
        contents: [
          {
            uri: "sis://example/v0.2",
            mimeType: "application/json",
            text,
          },
        ],
      };
    }
  );

  server.registerResource(
    "adss-example",
    "adss://example/v0.1",
    {
      title: "ADSS Example v0.1",
      description: "Example ADSS system",
      mimeType: "application/json",
    },
    async () => {
      const filePath = path.resolve(
        process.cwd(),
        "examples/adss-v0.1.example.json"
      );
      const text = await fs.readFile(filePath, "utf-8");

      return {
        contents: [
          {
            uri: "adss://example/v0.1",
            mimeType: "application/json",
            text,
          },
        ],
      };
    }
  );
}