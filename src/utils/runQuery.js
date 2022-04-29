import { createPropertyTables, createAgentTables } from './queryFunction';

(async () => {
  await createAgentTables();
  await createPropertyTables();
})();
