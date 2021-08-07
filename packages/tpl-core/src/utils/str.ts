// 首字母大写
export function strUpStart(str: string): string {
  return str.charAt(0).toLocaleUpperCase().concat(str.slice(1));
}
