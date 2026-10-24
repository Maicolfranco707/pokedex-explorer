const BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 20;

export class NotFoundError extends Error {}

const getArtworkUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const extractIdFromUrl = (url) => Number(url.split('/').filter(Boolean).pop());

// CONCEPTO: fetch con async/await para consumir la API
export async function fetchPokemonPage(offset) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  // CONCEPTO: revisar response.ok antes de leer el cuerpo de la respuesta
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return {
    hasMore: data.next !== null,
    results: data.results.map((item) => {
      const id = extractIdFromUrl(item.url);
      return { id, name: item.name, image: getArtworkUrl(id) };
    }),
  };
}

export async function fetchPokemonDetail(reference) {
  const response = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(reference)}`);
  if (response.status === 404) throw new NotFoundError('Pokemon not found');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    heightM: data.height / 10,
    weightKg: data.weight / 10,
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
    image: getArtworkUrl(data.id),
  };
}