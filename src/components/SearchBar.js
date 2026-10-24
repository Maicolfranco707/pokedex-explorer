import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText, onSubmit }) {
  return (
    <View style={styles.row}>
      {/* CONCEPTO: TextInput con autoCapitalize y autoCorrect desactivados */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Busca por nombre o número..."
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      <Pressable
        style={[styles.button, !value.trim() && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!value.trim()}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 8 },
  input: {
    flex: 1, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1,
    borderColor: '#ddd', paddingHorizontal: 12, paddingVertical: 10, fontSize: 16,
  },
  button: { backgroundColor: '#E3350D', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700' },
});