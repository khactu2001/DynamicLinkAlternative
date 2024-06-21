const useDebounce = (func: Function, delay: number) => {
  console.log('in debounce func', delay);
  let timerId: NodeJS.Timeout;

  return function (...params: any[]) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => func(...params), delay);
  };
};

export default useDebounce;
