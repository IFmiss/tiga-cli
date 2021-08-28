export default function obj2shell(obj: {
  [props: string]: string[] | string | boolean;
}): string {
  let str = "";
  for (const k in obj) {
    const v = obj[k];
    if (Array.isArray(obj[k])) {
      str += (v as string[])?.reduce((prev, cur) => {
        return (prev += `--${cur} `);
      }, "");
    } else {
      str +=
        typeof v === "boolean" ? (v === true ? `--${k} ` : "") : `--${k}=${v} `;
    }
  }
  return str;
}
