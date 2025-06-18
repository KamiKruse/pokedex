import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const init = initState()
  await startREPL(init)
}
main();
