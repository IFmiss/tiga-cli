import { performance } from 'perf_hooks';
type TimeType = 's' | 'ms';
export default function timer(): {
  getTime: (type?: TimeType) => number;
} {
  const t = performance.now();
  return {
    getTime: (type = 's') => {
      return Number(
        ((performance.now() - t) / (type === 'ms' ? 1 : 1000)).toFixed(2)
      );
    }
  };
}
