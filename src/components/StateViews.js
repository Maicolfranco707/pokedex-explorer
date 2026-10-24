import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export function LoadingView({ message = 'Cargando...' }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#E3350D" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ message }) {
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>🔍</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// CONCEPTO: StyleSheet para definir los estilos
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  emoji: { fontSize: 40 },
  message: { fontSize: 16, color: '#333', textAlign: 'center' },
  button: { backgroundColor: '#E3350D', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
});