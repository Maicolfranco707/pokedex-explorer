import { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';

export default function App() {
  // CONCEPTO: useState para saber qué Pokémon está abierto (null = se ve la lista)
  const [selected, setSelected] = useState(null);

  // CONCEPTO: array de dependencias de useEffect (se vuelve a ejecutar solo cuando cambia selected)
  useEffect(() => {
    if (selected === null) return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setSelected(null);
      return true;
    });
    return () => subscription.remove();
  }, [selected]);

  const isDetailOpen = selected !== null;

  return (
    // CONCEPTO: SafeAreaProvider necesario para usar SafeAreaView en las pantallas
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={[styles.screen, isDetailOpen && styles.hidden]}>
        <ListScreen onSelect={setSelected} />
      </View>
      {isDetailOpen && (
        <DetailScreen reference={selected} onBack={() => setSelected(null)} />
      )}
    </SafeAreaProvider>
  );
}

// CONCEPTO: StyleSheet para definir los estilos
const styles = StyleSheet.create({
  screen: { flex: 1 },
  hidden: { display: 'none' },
});