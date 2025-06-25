export const PETFINDER_CONFIG = {
  BASE_URL: "https://api.petfinder.com/v2/animals",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_PETFINDER_TOKEN}`,
  },
};

export const fetchPets = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${PETFINDER_CONFIG}?limit=20&type=${encodeURIComponent(query)}`
    : `${PETFINDER_CONFIG}?limit=20`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: PETFINDER_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
