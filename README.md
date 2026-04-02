# SIS + ADSS MCP Server

A reference server for validating, mapping, and explaining decision systems.

---

## The Problem

Most AI systems fail for a reason no one is measuring.

It’s not the model.  
It’s not the prompt.  

It’s the system continuing in a state that should have stopped.

You can validate a decision.  
You can audit a decision.  

But you cannot currently validate whether a system should still be running.

---

## What This Is

This server connects two layers:

- **SIS (Standard Intent Specification)** → what a valid decision looks like  
- **ADSS (Agentic Decision System Specification)** → how systems are structured  

Together, this enables:

- validation of decision contracts  
- mapping of decision points inside systems  
- detection of structural gaps  
- system-level explanation of behavior  

---

## What It Does

Given a system:

```json
{ "flows": [...] }

The server can:
	•	identify all decision points
	•	map them to required decision contracts
	•	detect missing or invalid bindings
	•	explain how the system operates

⸻

Example Output

{
  "valid": true,
  "mapping": {
    "required_sis_contracts": [
      {
        "intent_type": "offer_decision",
        "node_name": "Offer Decision"
      }
    ]
  },
  "coherence_score": 1
}


⸻

Why This Matters

Current AI infrastructure focuses on:
	•	model performance
	•	policy enforcement
	•	observability

None of these prevent failure.

Because failure is not a bad decision.

It is a system that should have stopped, but didn’t.

This server introduces a missing layer:

→ system-level validation and interpretation

⸻

Tools

SIS
	•	sis.get_schema
	•	sis.validate_payload
	•	sis.explain_decision

ADSS
	•	adss.get_schema
	•	adss.validate_system
	•	adss.map_decision_points
	•	adss.to_sis_map
	•	adss.gap_analysis
	•	adss.explain_system
	•	adss.validate_and_map
	•	adss.full_analysis

⸻

Local Development

npm install
npm run dev


⸻

Structure

src/
  index.ts
  lib/
  tools/
    sis/
    adss/

schemas/
examples/


⸻

Position

This is not a framework.

This is a reference implementation of:
	•	a decision contract standard (SIS)
	•	a system structure standard (ADSS)
	•	a validation and interpretation layer connecting them
