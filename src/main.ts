import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const init = initState()
  startREPL(init)
}
main();
