import { validateAdssSystem } from "./tools/adss/validateSystem.js";

const testSystem = {
  name: "Test",
  flows: [],
};

async function run() {
  const result = await validateAdssSystem(testSystem);
  console.log(result.content[0].text);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});