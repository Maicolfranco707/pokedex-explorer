import { useEffect, useState } from 'react';
import { fetchPokemonDetail, NotFoundError } from '../api/pokeApi';

export default function usePokemonDetail(reference) {
  // CONCEPTO: useState para guardar los datos y el estado de la ficha
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  // CONCEPTO: array de dependencias de useEffect (esto se repite solo si cambia reference o attempt)
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const data = await fetchPokemonDetail(reference);
        if (cancelled) return;
        setPokemon(data);
        setStatus('success');
      } catch (error) {
        if (cancelled) return;
        setStatus(error instanceof NotFoundError ? 'notFound' : 'error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reference, attempt]);

  return { pokemon, status, retry: () => setAttempt((value) => value + 1) };
}