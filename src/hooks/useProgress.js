import { useCallback, useRef, useState } from "react";

export function useProgress({
  min = 0,
  max = 100,
  defaultValue = -1,
  step = 1,
  interval = 50,
} = {}) {
  const [progress, setProgress] = useState(defaultValue);
  const timerRef = useRef();

  const start = useCallback(() => {
    setProgress(min);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p + step >= max) clearInterval(timerRef.current);
        return Math.min(p + step, max);
      });
    }, interval);
  }, [interval, min, max, step]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setProgress(defaultValue);
  }, [defaultValue]);

  const isCompleted = progress === max;
  const started = progress >= min;

  return { progress, isCompleted, started, start, stop, reset };
}
