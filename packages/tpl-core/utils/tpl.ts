interface TplExpOptions {
  spaceCount?: number;
  endNewline?: boolean;
}

// --rm-row-- 用于删除行
// --rm-space--  用于删除一个空格
export default function tpl(str: string, options?: TplExpOptions) {
  const { spaceCount = 4, endNewline = true } = options || {};
  const exp = new RegExp(`^${' '.repeat(spaceCount)}`, 'gm');
  return (
    str
      // remove start 换行
      .replace(/^\n/, '')
      // 整体缩紧
      .replace(exp, '')
      // 清除带换行符的行,且清除前面的空格
      .replace(/(\x20*)(--rm-row--)\n/g, '')
      // 清除需要删掉的space
      .replace(/--rm-space--/g, '')
      // .replace(/^\n/, '')
      // 清除结尾空格
      .replace(/\s*$/g, '')
      // 结尾添加换行符号
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
