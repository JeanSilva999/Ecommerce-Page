export function updateQuery(key: string, value: string) {
  const { pathname, search } = window.location;
  const newParams = new URLSearchParams(search);
  newParams.set(key, value);
  window.history.replaceState({}, "", `${pathname}?${newParams.toString()}`);
}
