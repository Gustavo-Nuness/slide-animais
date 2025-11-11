export default function debounce(callback, delay) {
  let timer;
  return (...args) => {
    console.log(...args)
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback(...args);
      timer = null;

    }, delay)
  }
}