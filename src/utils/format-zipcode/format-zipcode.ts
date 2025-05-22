export function formatZipcode(value: string) {
  const numericValue = value.replace(/\D/g, "");

  if (numericValue.length <= 5) {
    return numericValue;
  } else {
    return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
  }
}
