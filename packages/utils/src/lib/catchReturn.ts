export default function catchReturn(fn: any, r?: unknown) {
  try {
    return fn();
  } catch (e) {
    return r;
  }
}
