import { createAgentTables, createPropertyTables } from "./queryFunction"

(async () => {
  await createAgentTables();
  await createPropertyTables();
})();
