interface TplExpOptions {
  // 缩进
  indent?: number;

  // 结束换行
  endNewline?: boolean;

  // 第一行是否缩进
  startLineIndent?: boolean;
}

const indentSpace = (
  indent: number,
  justFirstLine = false
): [RegExp, string] => {
  let expArgs: [RegExp, string];

  if (indent > 0) {
    expArgs = [
      new RegExp(`^`, justFirstLine ? undefined : "gm"),
      " ".repeat(indent)
    ];
  } else {
    expArgs = [
      new RegExp(
        `^${" ".repeat(Math.abs(indent))}`,
        justFirstLine ? undefined : "gm"
      ),
      ""
    ];
  }
  return expArgs;
};

// --rm-row-- 用于删除行
// --rm-space--  用于删除一个空格
export default function tpl(str: string, options?: TplExpOptions) {
  const {
    indent = -4,
    endNewline = false,
    startLineIndent = false
  } = options || {};
  const allSpace = indentSpace(indent);

  const result = str
    // remove start 换行
    .replace(/^\n/, "")
    // 第一行
    .replace(/^(\x20)*/g, "")
    // 清除带换行符的行,且清除前面的空格
    .replace(/(\x20*)(--rm-row--)\n/g, "")
    // 清除需要删掉的space
    .replace(/--rm-space--/gm, "")
    // 清除结尾空格
    .replace(/(\x20*)$/gm, "")
    // 整体缩进 (第一行则不受影响)
    .replace(...allSpace)
    // 结尾添加换行符号
    .concat(endNewline ? "\n" : "");

  return startLineIndent
    ? result.replace(...indentSpace(0 - indent, true))
    : result;
}

// 一行代码渲染
export function renderRow(code: string, conditional?: boolean) {
  if (conditional) {
    return code;
  }
  return "--rm-row--";
}

// 文件渲染
export function fileStringify(
  value: any,
  replacer?: (string | number)[] | null | undefined,
  space?: string | number | undefined
) {
  return JSON.stringify(value, replacer, space);
}
