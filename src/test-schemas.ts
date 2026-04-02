import { getSisSchema } from "./tools/sis/getSchema.js";
import { getAdssSchema } from "./tools/adss/getSchema.js";

async function run() {
  const sis = await getSisSchema("0.2");
  const adss = await getAdssSchema("0.1");

  console.log("SIS:");
  console.log(sis.content[0].text.slice(0, 120));
  console.log("");
  console.log("ADSS:");
  console.log(adss.content[0].text.slice(0, 120));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});