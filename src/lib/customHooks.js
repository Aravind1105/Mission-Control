import { useMemo, useEffect, useRef } from "react";

export const useComponentWillMount = (func) => {
  useMemo(func, []);
};

export const useComponentDidMount = (func) => useEffect(func, []);

export const useComponentDidUpdate = (func) => useEffect(func);

export const useComponentWillUnmount = (func) =>
  useEffect(() => {
    return func;
  }, []);

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
