import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPokemonPage, PAGE_SIZE } from '../api/pokeApi';

export default function usePokemonList() {
  // CONCEPTO: useState para guardar los datos y el estado de la pantalla
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);

  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const busyRef = useRef(false);

  const loadPage = useCallback(async () => {
    if (busyRef.current || !hasMoreRef.current) return;
    busyRef.current = true;
    const isFirstPage = offsetRef.current === 0;
    if (isFirstPage) setStatus('loading');
    else {
      setLoadingMore(true);
      setLoadMoreError(false);
    }
    try {
      const page = await fetchPokemonPage(offsetRef.current);
      offsetRef.current += PAGE_SIZE;
      hasMoreRef.current = page.hasMore;
      setItems((previous) => [...previous, ...page.results]);
      setStatus('success');
    } catch (error) {
      if (isFirstPage) setStatus('error');
      else setLoadMoreError(true);
    } finally {
      busyRef.current = false;
      setLoadingMore(false);
    }
  }, []);

  // CONCEPTO: array de dependencias de useEffect (se ejecuta una sola vez porque loadPage nunca cambia)
  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (status === 'success' && !loadMoreError) loadPage();
  }, [status, loadMoreError, loadPage]);

  return { items, status, loadingMore, loadMoreError, loadMore, retry: loadPage };
}