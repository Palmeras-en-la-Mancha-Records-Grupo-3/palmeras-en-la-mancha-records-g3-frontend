async function createArtist(artist) {
  const response = await axios.post(`${API_URL}/artist`, artist);
  return response.data;
}

