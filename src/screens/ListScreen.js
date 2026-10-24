import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { ErrorView, LoadingView } from '../components/StateViews';
import usePokemonList from '../hooks/usePokemonList';
import { normalizeQuery } from '../utils/format';

export default function ListScreen({ onSelect }) {
  const [query, setQuery] = useState('');
  const { items, status, loadingMore, loadMoreError, loadMore, retry } = usePokemonList();

  const handleSearch = () => {
    const normalized = normalizeQuery(query);
    if (normalized) onSelect(normalized);
  };

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color="#E3350D" />
          <Text style={styles.footerText}>Cargando más Pokémon...</Text>
        </View>
      );
    }
    if (loadMoreError) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>No se pudieron cargar más Pokémon.</Text>
          <Pressable style={styles.retry} onPress={retry}>
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }
    return null;
  };

  return (
    // CONCEPTO: SafeAreaView para respetar el notch y los bordes del celular
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>
      <SearchBar value={query} onChangeText={setQuery} onSubmit={handleSearch} />

      {status === 'loading' && <LoadingView message="Cargando Pokémon..." />}

      {status === 'error' && (
        <ErrorView
          message="No pudimos cargar la lista. Revisa tu conexión e inténtalo de nuevo."
          onRetry={retry}
        />
      )}

      {status === 'success' && (
        // CONCEPTO: FlatList con numColumns, keyExtractor y onEndReached (scroll infinito)
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelect} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f6' },
  title: { fontSize: 26, fontWeight: '800', color: '#E3350D', padding: 16, paddingBottom: 8 },
  list: { paddingHorizontal: 10, paddingBottom: 16 },
  footer: { padding: 16, alignItems: 'center', gap: 8 },
  footerText: { color: '#555' },
  retry: { backgroundColor: '#E3350D', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '700' },
});