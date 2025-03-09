import { Image, StyleSheet, Platform, TouchableOpacity, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type RandomizerOption = {
  id: string;
  title: string;
  icon: string;
  color: string;
  darkColor: string;
};

export default function HomeScreen() {
  const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#121212' });

  const options: RandomizerOption[] = [
    { id: 'numbers', title: 'Numbers', icon: 'number', color: '#FF9AA2', darkColor: '#8B3D42' },
    { id: 'letters', title: 'Letters', icon: 'textformat.abc', color: '#FFB7B2', darkColor: '#8B4D47' },
    { id: 'dice', title: 'Dice', icon: 'dice', color: '#FFDAC1', darkColor: '#8B6841' },
    { id: 'yesno', title: 'Yes / No', icon: 'arrow.left.arrow.right', color: '#E2F0CB', darkColor: '#5A7841' },
    { id: 'cards', title: 'Cards', icon: 'rectangle.stack', color: '#B5EAD7', darkColor: '#377260' },
    { id: 'flip', title: 'Heads or Tails', icon: 'circle.lefthalf.fill', color: '#C7CEEA', darkColor: '#3E4973' },
    { id: 'color', title: 'Random Color', icon: 'paintpalette', color: '#E0BBE4', darkColor: '#604565' },
    { id: 'rps', title: 'Rock Paper Scissors', icon: 'hand.wave', color: '#FEC8D8', darkColor: '#8B4D5E' },
  ];

  const handleOptionPress = (option: RandomizerOption) => {
    router.push(`/(randomizers)/${option.id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Randomize Me</ThemedText>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsGrid}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                { backgroundColor: useThemeColor({ light: option.color, dark: option.darkColor }) }
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <IconSymbol
                size={36}
                name={option.icon}
                color={useThemeColor({ light: '#333333', dark: '#FFFFFF' })}
              />
              <ThemedText style={styles.optionText}>{option.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    height: 140,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
});
