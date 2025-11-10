export const fetchAndCache = async ({ url, setState, storageKey, parser }) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data = await res.json();
  const parsedData = parser(data);

  setState(parsedData);

  localStorage.setItem(
    storageKey,
    JSON.stringify({ data: parsedData, lastUpdate: Date.now() })
  );

  return parsedData;
};
