import * as vm from "vm";

export default function renderContextFile<T>(
  compileCode: Function,
  options: T
) {
  let c;
  try {
    const parsingContext = vm.createContext({
      options,
      compile: compileCode
    });
    const codeFn = "return compile(options)";
    const fn = vm.compileFunction(codeFn, [], {
      parsingContext
    });
    c = fn();
  } catch (e) {
    console.info("e", JSON.stringify(e));
  }
  return c;
}
