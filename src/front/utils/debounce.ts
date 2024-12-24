export function debounce(func: () => void, time = 100) {
  let funcTime = time;
  let timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, funcTime, event);
  };
}
