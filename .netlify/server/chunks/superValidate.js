import { p as parseRequest, m as mergeDefaults, b as mapErrors, r as replaceInvalidDefaults, c as splitPath, t as traversePath } from "./zod.js";
import { f as fail } from "./index.js";
import "just-clone";
import "ts-deepmerge";
async function superValidate(data, adapter, options) {
  if (data && "superFormValidationLibrary" in data) {
    options = adapter;
    adapter = data;
    data = void 0;
  }
  const validator = adapter;
  const defaults = options?.defaults ?? validator.defaults;
  const jsonSchema = validator.jsonSchema;
  const parsed = await parseRequest(data, jsonSchema, options);
  const addErrors = options?.errors ?? (options?.strict ? true : !!parsed.data);
  const parsedData = options?.strict ? parsed.data ?? {} : mergeDefaults(parsed.data, defaults);
  let status;
  if (!!parsed.data || addErrors) {
    status = await /* @__PURE__ */ validator.validate(parsedData);
  } else {
    status = { success: false, issues: [] };
  }
  const valid = status.success;
  const errors = valid || !addErrors ? {} : mapErrors(status.issues, validator.shape);
  const dataWithDefaults = valid ? status.data : replaceInvalidDefaults(options?.strict ? mergeDefaults(parsedData, defaults) : parsedData, defaults, jsonSchema, status.issues, options?.preprocessed);
  let outputData;
  if (jsonSchema.additionalProperties === false) {
    outputData = {};
    for (const key of Object.keys(jsonSchema.properties ?? {})) {
      if (key in dataWithDefaults)
        outputData[key] = dataWithDefaults[key];
    }
  } else {
    outputData = dataWithDefaults;
  }
  const output = {
    id: parsed.id ?? options?.id ?? validator.id,
    valid,
    posted: parsed.posted,
    errors,
    data: outputData
  };
  if (!parsed.posted) {
    output.constraints = validator.constraints;
    if (Object.keys(validator.shape).length) {
      output.shape = validator.shape;
    }
  }
  return output;
}
function message(form, message2, options) {
  if (options?.status && options.status >= 400) {
    form.valid = false;
  }
  form.message = message2;
  const remove = options?.removeFiles !== false;
  const output = remove ? withFiles({ form }) : { form };
  return form.valid ? output : fail(options?.status ?? 400, output);
}
function setError(form, path, error, options) {
  if (error == void 0 || typeof error !== "string" && !Array.isArray(error)) {
    options = error;
    error = path;
    path = "";
  }
  if (options === void 0)
    options = {};
  const errArr = Array.isArray(error) ? error : [error];
  if (!form.errors)
    form.errors = {};
  if (path === null || path === "") {
    if (!form.errors._errors)
      form.errors._errors = [];
    form.errors._errors = options.overwrite ? errArr : form.errors._errors.concat(errArr);
  } else {
    const realPath = splitPath(path);
    const leaf = traversePath(form.errors, realPath, ({ parent, key, value }) => {
      if (value === void 0)
        parent[key] = {};
      return parent[key];
    });
    if (leaf) {
      leaf.parent[leaf.key] = Array.isArray(leaf.value) && !options.overwrite ? leaf.value.concat(errArr) : errArr;
    }
  }
  form.valid = false;
  const output = options.removeFiles === false ? { form } : withFiles({ form });
  return fail(options.status ?? 400, output);
}
function withFiles(obj) {
  if (typeof obj !== "object")
    return obj;
  for (const key in obj) {
    const value = obj[key];
    if (value instanceof File)
      delete obj[key];
    else if (value && typeof value === "object")
      withFiles(value);
  }
  return obj;
}
export {
  setError as a,
  message as m,
  superValidate as s
};
