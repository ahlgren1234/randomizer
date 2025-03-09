import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function DiceRandomizer() {
  const [count, setCount] = useState('1');
  const [sides, setSides] = useState('6');
  const [result, setResult] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const buttonBackground = useThemeColor({ light: '#FFDAC1', dark: '#8B6841' });
  const inputBackground = useThemeColor({ light: '#FFFFFF', dark: '#2C2C2C' });
  const inputBorder = useThemeColor({ light: '#DDDDDD', dark: '#444444' });
  
  const renderDiceValue = (value: number) => {
    // For standard 6-sided dice, we show special dice faces
    if (parseInt(sides) === 6 && value >= 1 && value <= 6) {
      return (
        <View style={[styles.diceFace, { backgroundColor: buttonBackground }]}>
          {value === 1 && (
            <View style={styles.dotCenter} />
          )}
          
          {value === 2 && (
            <>
              <View style={[styles.dot, { top: 8, left: 8 }]} />
              <View style={[styles.dot, { bottom: 8, right: 8 }]} />
            </>
          )}
          
          {value === 3 && (
            <>
              <View style={[styles.dot, { top: 8, left: 8 }]} />
              <View style={styles.dotCenter} />
              <View style={[styles.dot, { bottom: 8, right: 8 }]} />
            </>
          )}
          
          {value === 4 && (
            <>
              <View style={[styles.dot, { top: 8, left: 8 }]} />
              <View style={[styles.dot, { top: 8, right: 8 }]} />
              <View style={[styles.dot, { bottom: 8, left: 8 }]} />
              <View style={[styles.dot, { bottom: 8, right: 8 }]} />
            </>
          )}
          
          {value === 5 && (
            <>
              <View style={[styles.dot, { top: 8, left: 8 }]} />
              <View style={[styles.dot, { top: 8, right: 8 }]} />
              <View style={styles.dotCenter} />
              <View style={[styles.dot, { bottom: 8, left: 8 }]} />
              <View style={[styles.dot, { bottom: 8, right: 8 }]} />
            </>
          )}
          
          {value === 6 && (
            <>
              <View style={[styles.dot, { top: 8, left: 8 }]} />
              <View style={[styles.dot, { top: 8, right: 8 }]} />
              <View style={[styles.dot, { top: 32, left: 8 }]} />
              <View style={[styles.dot, { top: 32, right: 8 }]} />
              <View style={[styles.dot, { bottom: 8, left: 8 }]} />
              <View style={[styles.dot, { bottom: 8, right: 8 }]} />
            </>
          )}
        </View>
      );
    } else {
      // For non-standard dice, we just show the number
      return (
        <View style={[styles.diceGeneral, { backgroundColor: buttonBackground }]}>
          <ThemedText style={styles.diceGeneralText}>{value}</ThemedText>
        </View>
      );
    }
  };
  
  const rollDice = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsGenerating(true);
    
    const countNum = parseInt(count, 10);
    const sidesNum = parseInt(sides, 10);
    
    if (isNaN(countNum) || isNaN(sidesNum) || countNum < 1 || sidesNum < 2) {
      setResult([]);
      setIsGenerating(false);
      return;
    }
    
    // Create a rolling effect for visual appeal
    const intervalId = setInterval(() => {
      const newResults: number[] = [];
      for (let i = 0; i < countNum; i++) {
        newResults.push(Math.floor(Math.random() * sidesNum) + 1);
      }
      setResult(newResults);
    }, 100);
    
    // Stop the rolling effect after a delay
    setTimeout(() => {
      clearInterval(intervalId);
      setIsGenerating(false);
    }, 800);
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Roll Dice' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.inputsContainer}>
          <View style={styles.inputRow}>
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Number of Dice</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorder }]}
                value={count}
                onChangeText={setCount}
                keyboardType="numeric"
                maxLength={2}
              />
            </ThemedView>
            
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Sides per Die</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorder }]}
                value={sides}
                onChangeText={setSides}
                keyboardType="numeric"
                maxLength={3}
              />
            </ThemedView>
          </View>
        </ThemedView>
        
        <TouchableOpacity
          style={[styles.rollButton, { backgroundColor: buttonBackground }]}
          onPress={rollDice}
          disabled={isGenerating}
        >
          <ThemedText style={styles.rollButtonText}>
            {isGenerating ? 'Rolling...' : 'Roll Dice'}
          </ThemedText>
        </TouchableOpacity>
        
        <ThemedView style={styles.resultContainer}>
          {result.length > 0 ? (
            <>
              <ThemedText style={styles.resultTitle}>Results:</ThemedText>
              <View style={styles.diceContainer}>
                {result.map((value, index) => (
                  <View key={index}>
                    {renderDiceValue(value)}
                  </View>
                ))}
              </View>
              <ThemedText style={styles.totalText}>
                Total: {result.reduce((sum, value) => sum + value, 0)}
              </ThemedText>
            </>
          ) : (
            <ThemedText style={styles.emptyResult}>
              Roll the dice to see the results
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
    textAlign: 'center',
  },
  rollButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  rollButtonText: {
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
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  diceFace: {
    width: 70,
    height: 70,
    borderRadius: 12,
    margin: 8,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  dotCenter: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    top: '50%',
    left: '50%',
    marginLeft: -7,
    marginTop: -7,
  },
  diceGeneral: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  diceGeneralText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  emptyResult: {
    opacity: 0.5,
    fontSize: 16,
  },
});