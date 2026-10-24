import { StyleSheet, Text, View } from 'react-native';
import { MAX_STAT, STAT_LABELS } from '../constants/pokemonTypes';

export default function StatBar({ name, value, color }) {
  const widthPercent = `${Math.min((value / MAX_STAT) * 100, 100)}%`;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: widthPercent, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 5 },
  label: { width: 95, color: '#555', fontSize: 14 },
  value: { width: 34, fontWeight: '700', textAlign: 'right', color: '#222' },
  track: { flex: 1, height: 10, backgroundColor: '#e6e6e6', borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});