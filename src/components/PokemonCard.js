import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { capitalize, formatNumber } from '../utils/format';

export default function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(pokemon.id)}>
      {/* CONCEPTO: Image remota, necesita width y height explícitos */}
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.number}>#{formatNumber(pokemon.id)}</Text>
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.5, margin: 6, padding: 12, backgroundColor: '#fff', borderRadius: 12,
    alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 110, height: 110 },
  number: { color: '#888', fontSize: 13, marginTop: 4 },
  name: { fontSize: 16, fontWeight: '700', color: '#222' },
});