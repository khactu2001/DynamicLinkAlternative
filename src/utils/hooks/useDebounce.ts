import React from 'react';
let timerId: NodeJS.Timeout;

const useDebounce = (func: Function, delay: number) => {
  return function (...params: any[]) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => func(...params), delay);
  };
};

export default useDebounce;

// const textDebounce = useDebounce(setText, 500);
