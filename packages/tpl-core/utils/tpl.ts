interface TplExpOptions {
  spaceCount?: number;
  endNewline?: boolean;
}

// --rm-row-- 用于删除行
// --rm-space--  用于删除一个空格
export default function tpl(str: string, options?: TplExpOptions) {
  const { spaceCount = 4, endNewline = false } = options || {};
  const exp = new RegExp(`^${' '.repeat(spaceCount)}`, 'gm');
  return (
    str
      .replace(/^\n/, '')
      .replace(exp, '')
      // 清除带换行符的行
      .replace(/(\s*)(--rm-row--)\n/g, '')
      .replace(/--rm-space--/g, '')
      .replace(/^\n/, '')
      .replace(/\s*$/g, '')
      .concat(endNewline ? '\n' : '')
  );
}

// 一行代码渲染
export function renderRow(code: string, conditional?: boolean) {
  if (conditional) {
    return code;
  }
  return '--rm-row--';
}

// 文件渲染
export function fileStringify(
  value: any,
  replacer?: (string | number)[] | null | undefined,
  space?: string | number | undefined
) {
  return JSON.stringify(value, replacer, space);
}
