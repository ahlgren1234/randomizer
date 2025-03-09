import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const cardImages: { [key: string]: any } = {
  '2_of_hearts': require('../../assets/images/cards/2_of_hearts.png'),
  '3_of_hearts': require('../../assets/images/cards/3_of_hearts.png'),
  '4_of_hearts': require('../../assets/images/cards/4_of_hearts.png'),
  '5_of_hearts': require('../../assets/images/cards/5_of_hearts.png'),
  '6_of_hearts': require('../../assets/images/cards/6_of_hearts.png'),
  '7_of_hearts': require('../../assets/images/cards/7_of_hearts.png'),
  '8_of_hearts': require('../../assets/images/cards/8_of_hearts.png'),
  '9_of_hearts': require('../../assets/images/cards/9_of_hearts.png'),
  '10_of_hearts': require('../../assets/images/cards/10_of_hearts.png'),
  'J_of_hearts': require('../../assets/images/cards/J_of_hearts.png'),
  'Q_of_hearts': require('../../assets/images/cards/Q_of_hearts.png'),
  'K_of_hearts': require('../../assets/images/cards/K_of_hearts.png'),
  'A_of_hearts': require('../../assets/images/cards/A_of_hearts.png'),
  '2_of_diamonds': require('../../assets/images/cards/2_of_diamonds.png'),
  '3_of_diamonds': require('../../assets/images/cards/3_of_diamonds.png'),
  '4_of_diamonds': require('../../assets/images/cards/4_of_diamonds.png'),
  '5_of_diamonds': require('../../assets/images/cards/5_of_diamonds.png'),
  '6_of_diamonds': require('../../assets/images/cards/6_of_diamonds.png'),
  '7_of_diamonds': require('../../assets/images/cards/7_of_diamonds.png'),
  '8_of_diamonds': require('../../assets/images/cards/8_of_diamonds.png'),
  '9_of_diamonds': require('../../assets/images/cards/9_of_diamonds.png'),
  '10_of_diamonds': require('../../assets/images/cards/10_of_diamonds.png'),
  'J_of_diamonds': require('../../assets/images/cards/J_of_diamonds.png'),
  'Q_of_diamonds': require('../../assets/images/cards/Q_of_diamonds.png'),
  'K_of_diamonds': require('../../assets/images/cards/K_of_diamonds.png'),
  'A_of_diamonds': require('../../assets/images/cards/A_of_diamonds.png'),
  '2_of_clubs': require('../../assets/images/cards/2_of_clubs.png'),
  '3_of_clubs': require('../../assets/images/cards/3_of_clubs.png'),
  '4_of_clubs': require('../../assets/images/cards/4_of_clubs.png'),
  '5_of_clubs': require('../../assets/images/cards/5_of_clubs.png'),
  '6_of_clubs': require('../../assets/images/cards/6_of_clubs.png'),
  '7_of_clubs': require('../../assets/images/cards/7_of_clubs.png'),
  '8_of_clubs': require('../../assets/images/cards/8_of_clubs.png'),
  '9_of_clubs': require('../../assets/images/cards/9_of_clubs.png'),
  '10_of_clubs': require('../../assets/images/cards/10_of_clubs.png'),
  'J_of_clubs': require('../../assets/images/cards/J_of_clubs.png'),
  'Q_of_clubs': require('../../assets/images/cards/Q_of_clubs.png'),
  'K_of_clubs': require('../../assets/images/cards/K_of_clubs.png'),
  'A_of_clubs': require('../../assets/images/cards/A_of_clubs.png'),
  '2_of_spades': require('../../assets/images/cards/2_of_spades.png'),
  '3_of_spades': require('../../assets/images/cards/3_of_spades.png'),
  '4_of_spades': require('../../assets/images/cards/4_of_spades.png'),
  '5_of_spades': require('../../assets/images/cards/5_of_spades.png'),
  '6_of_spades': require('../../assets/images/cards/6_of_spades.png'),
  '7_of_spades': require('../../assets/images/cards/7_of_spades.png'),
  '8_of_spades': require('../../assets/images/cards/8_of_spades.png'),
  '9_of_spades': require('../../assets/images/cards/9_of_spades.png'),
  '10_of_spades': require('../../assets/images/cards/10_of_spades.png'),
  'J_of_spades': require('../../assets/images/cards/J_of_spades.png'),
  'Q_of_spades': require('../../assets/images/cards/Q_of_spades.png'),
  'K_of_spades': require('../../assets/images/cards/K_of_spades.png'),
  'A_of_spades': require('../../assets/images/cards/A_of_spades.png'),
};

export default function PlayingCardsRandomizer() {
  const [count, setCount] = useState('1');
  const [cards, setCards] = useState<{ suit: string; value: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const buttonBackground = useThemeColor({ light: '#B5EAD7', dark: '#377260' });
  const inputBackground = useThemeColor({ light: '#FFFFFF', dark: '#2C2C2C' });
  const inputBorder = useThemeColor({ light: '#DDDDDD', dark: '#444444' });
  
  const generateRandomCards = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsGenerating(true);
    
    const countNum = parseInt(count, 10);
    
    if (isNaN(countNum) || countNum < 1) {
      setCards([]);
      setIsGenerating(false);
      return;
    }
    
    const newCards: { suit: string; value: string }[] = [];
    for (let i = 0; i < countNum; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const value = values[Math.floor(Math.random() * values.length)];
      newCards.push({ suit, value });
    }
    
    setCards(newCards);
    setIsGenerating(false);
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Random Playing Cards' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.inputsContainer}>
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>How many cards?</ThemedText>
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
          onPress={generateRandomCards}
          disabled={isGenerating}
        >
          <ThemedText style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Draw Cards'}
          </ThemedText>
        </TouchableOpacity>
        
        <ThemedView style={styles.resultContainer}>
          {cards.length > 0 ? (
            <View style={styles.cardsContainer}>
              {cards.map((card, index) => (
                <Image
                  key={index}
                  source={cardImages[`${card.value}_of_${card.suit}`]}
                  style={styles.cardImage}
                />
              ))}
            </View>
          ) : (
            <ThemedText style={styles.emptyResult}>
              The drawn cards will appear here
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  cardImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  emptyResult: {
    opacity: 0.5,
    fontSize: 16,
  },
});