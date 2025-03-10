import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function NumbersRandomizer() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [result, setResult] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const buttonBackground = useThemeColor({ light: '#FF9AA2', dark: '#8B3D42' });
  const inputBackground = useThemeColor({ light: '#FFFFFF', dark: '#2C2C2C' });
  const inputBorder = useThemeColor({ light: '#DDDDDD', dark: '#444444' });

  const generateRandomNumbers = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsGenerating(true);
    
    const minNum = parseInt(min, 10);
    const maxNum = parseInt(max, 10);
    const countNum = parseInt(count, 10);
    
    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || countNum < 1) {
      setResult([]);
      setIsGenerating(false);
      return;
    }

    // Simulate a little delay for visual effect
    setTimeout(() => {
      const newNumbers: number[] = [];
      for (let i = 0; i < countNum; i++) {
        const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        newNumbers.push(randomNum);
      }
      setResult(newNumbers);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Random Numbers' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.inputsContainer}>
          <View style={styles.inputRow}>
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Min</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorder }]}
                value={min}
                onChangeText={setMin}
                keyboardType="numeric"
              />
            </ThemedView>
            
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Max</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorder }]}
                value={max}
                onChangeText={setMax}
                keyboardType="numeric"
              />
            </ThemedView>
          </View>
          
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>How many numbers?</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorder }]}
              value={count}
              onChangeText={setCount}
              keyboardType="numeric"
            />
          </ThemedView>
        </ThemedView>

        <TouchableOpacity
          style={[styles.generateButton, { backgroundColor: buttonBackground }]}
          onPress={generateRandomNumbers}
          disabled={isGenerating}
        >
          <ThemedText style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate Random Numbers'}
          </ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.resultContainer}>
          {result.length > 0 ? (
            <>
              <ThemedText style={styles.resultTitle}>Results:</ThemedText>
              <View style={styles.numbersContainer}>
                {result.map((number, index) => (
                  <View key={index} style={[styles.numberBubble, { backgroundColor: buttonBackground }]}>
                    <ThemedText style={styles.numberText}>{number}</ThemedText>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <ThemedText style={styles.emptyResult}>
              The results will appear here
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputsContainer: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  generateButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 65, // Increased margin to add more space
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  numberText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyResult: {
    opacity: 0.5,
    fontSize: 16,
  },
});