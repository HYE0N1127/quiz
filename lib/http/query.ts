export const querify = (
  query: Record<string, number | string | boolean>
): string => {
  const filtered = Object.entries(query).reduce((prev, [key, value]) => {
    if (value != null && value !== "") {
      prev[key] = String(value);
    }

    return prev;
  }, {} as Record<string, string>);

  return new URLSearchParams(filtered).toString();
};
