import * as vm from 'vm';

interface TplExpOptions {
  spaceCount: number;
}

// --rm-row-- 用于删除行
// --rm-space--  用于删除一个空格
export function tplFmtCode(str: string, options?: TplExpOptions) {
  const spaceCount = options?.spaceCount ?? 4;
  const exp = new RegExp(`^${' '.repeat(spaceCount)}`, 'gm');
  return (
    str
      .replace(/^\n/, '')
      .replace(exp, '')
      // 清除带换行符的行
      .replace(/(--rm-row--)\n/g, '')
      .replace(/--rm-space--/g, '')
  );
}

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
    const codeFn = 'return compile(options)';
    const fn = vm.compileFunction(codeFn, [], {
      parsingContext
    });
    c = fn();
  } catch (e) {
    console.info('e', JSON.stringify(e));
  }
  return c;
}
