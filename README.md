# SIS + ADSS MCP Server

Reference MCP server for the Standard Intent Specification (SIS) and Agentic Decision System Specification (ADSS).

## Purpose

This server exposes tools for:

- validating SIS payloads
- validating ADSS systems
- mapping ADSS decision points to SIS contracts
- analyzing structural gaps in ADSS systems
- generating human-readable explanations of systems and decisions

## Included Standards

- **SIS** — decision contract standard
- **ADSS** — system design standard for multi-agent workflows

## Current Tools

### SIS
- `sis.get_schema`
- `sis.validate_payload`
- `sis.explain_decision`

### ADSS
- `adss.get_schema`
- `adss.validate_system`
- `adss.map_decision_points`
- `adss.to_sis_map`
- `adss.gap_analysis`
- `adss.explain_system`
- `adss.validate_and_map`
- `adss.full_analysis`

### Utility
- `ping`

## Local Development

Install dependencies:

```bash
npm install

Run locally:

npm run dev

Project Structure

src/
  index.ts
  lib/
  tools/
    sis/
    adss/

schemas/
examples/

Notes

This is a reference standards server, not a production runtime control plane.

SIS defines decision contracts.
ADSS defines system structure.
This MCP server makes both standards accessible through a unified interface.
