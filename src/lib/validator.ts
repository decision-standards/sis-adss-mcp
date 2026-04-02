import Ajv2020Import from "ajv/dist/2020.js";
import addFormatsImport from "ajv-formats";
import fs from "fs/promises";

const Ajv2020Ctor: any =
  (Ajv2020Import as any).default ?? Ajv2020Import;

const addFormats: any =
  (addFormatsImport as any).default ?? addFormatsImport;

const ajv = new Ajv2020Ctor({
  allErrors: true,
  strict: false,
});

addFormats(ajv);

export async function validateAgainstSchema(
  schemaPath: string,
  data: unknown
) {
  try {
    const schemaText = await fs.readFile(schemaPath, "utf-8");
    const schema = JSON.parse(schemaText);

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
      return {
        valid: true,
        errors: [],
      };
    }

    return {
      valid: false,
      errors: validate.errors ?? [],
    };
  } catch (err: any) {
    return {
      valid: false,
      errors: [{ message: err.message }],
    };
  }
}