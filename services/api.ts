export const PETFINDER_CONFIG = {
  BASE_URL: "https://api.petfinder.com/v2/animals",
  headers: {
    // accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_PETFINDER_TOKEN}`,
  },
};

export const fetchPets = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${PETFINDER_CONFIG.BASE_URL}?limit=20&type=${encodeURIComponent(query)}`
    : `${PETFINDER_CONFIG.BASE_URL}?limit=20`;

  console.log(endpoint);
  const response = await fetch(endpoint, {
    method: "GET",
    headers: PETFINDER_CONFIG.headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  console.log(response);

  const data = await response.json();
  //   const data = response;
  //   console.log(data)
  //   return data.results;
  //   console.log(data);
  console.log(JSON.stringify(data, null, 2));
  //   console.log("Parsed JSON:", data); //  Check full object
  //   console.log("Animals array:", data.animals); // Specific key you need
//   console.log(data.animals);
  return data.animals;
  //   return data;
};
