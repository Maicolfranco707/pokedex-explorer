import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatBar from '../components/StatBar';
import { EmptyView, ErrorView, LoadingView } from '../components/StateViews';
import TypeBadge from '../components/TypeBadge';
import { TYPE_COLORS } from '../constants/pokemonTypes';
import usePokemonDetail from '../hooks/usePokemonDetail';
import { capitalize, formatNumber } from '../utils/format';

export default function DetailScreen({ reference, onBack }) {
  const { pokemon, status, retry } = usePokemonDetail(reference);

  const renderBody = () => {
    if (status === 'loading') return <LoadingView message="Cargando ficha..." />;
    if (status === 'notFound') {
      return <EmptyView message={`No encontramos ningún Pokémon con el nombre o número "${reference}".`} />;
    }
    if (status === 'error') {
      return (
        <ErrorView
          message="No pudimos cargar la ficha. Revisa tu conexión e inténtalo de nuevo."
          onRetry={retry}
        />
      );
    }

    const mainColor = TYPE_COLORS[pokemon.types[0]] ?? '#777';
    return (
      <View style={styles.content}>
        <View style={[styles.imageBox, { backgroundColor: `${mainColor}33` }]}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
        <Text style={styles.number}>#{formatNumber(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <Text style={styles.measure}>Altura: {pokemon.heightM.toFixed(1)} m</Text>
          <Text style={styles.measure}>Peso: {pokemon.weightKg.toFixed(1)} kg</Text>
        </View>

        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} name={stat.name} value={stat.value} color={mainColor} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {renderBody()}
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>Volver a la lista</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, padding: 16 },
  content: { alignItems: 'center' },
  imageBox: { width: '100%', alignItems: 'center', borderRadius: 16, paddingVertical: 12 },
  image: { width: 240, height: 240 },
  number: { color: '#888', fontSize: 16, marginTop: 10 },
  name: { fontSize: 30, fontWeight: '800', color: '#222' },
  types: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  measures: { flexDirection: 'row', gap: 24, marginBottom: 8 },
  measure: { fontSize: 16, color: '#444' },
  sectionTitle: { alignSelf: 'flex-start', fontSize: 18, fontWeight: '700', marginTop: 12, marginBottom: 4 },
  backButton: { backgroundColor: '#E3350D', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 24 },
  backText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});