import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function LettersRandomizer() {
  const [count, setCount] = useState('1');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [result, setResult] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const buttonBackground = useThemeColor({ light: '#FFB7B2', dark: '#8B4D47' });
  const inputBackground = useThemeColor({ light: '#FFFFFF', dark: '#2C2C2C' });
  const inputBorder = useThemeColor({ light: '#DDDDDD', dark: '#444444' });

  const generateRandomLetters = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsGenerating(true);
    
    const countNum = parseInt(count, 10);
    
    if (isNaN(countNum) || countNum < 1 || (!includeUppercase && !includeLowercase)) {
      setResult([]);
      setIsGenerating(false);
      return;
    }

    // Simulate a little delay for visual effect
    setTimeout(() => {
      const newLetters: string[] = [];
      const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let possibleLetters = '';
      
      if (includeLowercase) possibleLetters += lowercaseLetters;
      if (includeUppercase) possibleLetters += uppercaseLetters;
      
      for (let i = 0; i < countNum; i++) {
        const randomIndex = Math.floor(Math.random() * possibleLetters.length);
        newLetters.push(possibleLetters[randomIndex]);
      }
      
      setResult(newLetters);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Random Letters' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.inputsContainer}>
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>How many letters?</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorder }]}
              value={count}
              onChangeText={setCount}
              keyboardType="numeric"
            />
          </ThemedView>
          
          <ThemedView style={styles.switchContainer}>
            <ThemedText style={styles.label}>Include uppercase letters</ThemedText>
            <Switch
              value={includeUppercase}
              onValueChange={setIncludeUppercase}
              trackColor={{ false: '#767577', true: buttonBackground }}
            />
          </ThemedView>
          
          <ThemedView style={styles.switchContainer}>
            <ThemedText style={styles.label}>Include lowercase letters</ThemedText>
            <Switch
              value={includeLowercase}
              onValueChange={setIncludeLowercase}
              trackColor={{ false: '#767577', true: buttonBackground }}
            />
          </ThemedView>
        </ThemedView>

        <TouchableOpacity
          style={[styles.generateButton, { backgroundColor: buttonBackground }]}
          onPress={generateRandomLetters}
          disabled={isGenerating}
        >
          <ThemedText style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate Random Letters'}
          </ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.resultContainer}>
          {result.length > 0 ? (
            <>
              <ThemedText style={styles.resultTitle}>Results:</ThemedText>
              <View style={styles.lettersContainer}>
                {result.map((letter, index) => (
                  <View key={index} style={[styles.letterBubble, { backgroundColor: buttonBackground }]}>
                    <ThemedText style={styles.letterText}>{letter}</ThemedText>
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
  inputGroup: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    marginVertical: 16,
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
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letterBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  letterText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyResult: {
    opacity: 0.5,
    fontSize: 16,
  },
});