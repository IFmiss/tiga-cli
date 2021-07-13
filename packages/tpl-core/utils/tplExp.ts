interface TplExpOptions {
  spaceCount: number;
}

// --rm-row-- 用于删除行
// --rm-space--  用于删除一个空格
export default function tplExp(str: string, options?: TplExpOptions) {
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
