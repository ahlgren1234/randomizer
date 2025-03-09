import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

export default function RockPaperScissorsRandomizer() {
  const [userChoice, setUserChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shake] = useState(new Animated.Value(0));
  
  const buttonBackground = useThemeColor({ light: '#FEC8D8', dark: '#8B4D5E' });
  const rockColor = useThemeColor({ light: '#AAAAAA', dark: '#555555' });
  const paperColor = useThemeColor({ light: '#FFFFFF', dark: '#CCCCCC' });
  const scissorsColor = useThemeColor({ light: '#FF9AA2', dark: '#8B3D42' });
  
  useEffect(() => {
    if (userChoice && computerChoice) {
      determineWinner();
    }
  }, [userChoice, computerChoice]);
  
  const startShakeAnimation = () => {
    shake.setValue(0);
    Animated.timing(shake, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };
  
  const getRandomChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };
  
  const handleUserChoice = (choice: Choice) => {
    if (isPlaying) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPlaying(true);
    setUserChoice(choice);
    setComputerChoice(null);
    setResult(null);
    
    startShakeAnimation();
    
    // Simulate computer thinking
    setTimeout(() => {
      setComputerChoice(getRandomChoice());
      setIsPlaying(false);
    }, 1000);
  };
  
  const determineWinner = () => {
    if (!userChoice || !computerChoice) return;
    
    if (userChoice === computerChoice) {
      setResult('draw');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('win');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setResult('lose');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };
  
  const getChoiceIcon = (choice: Choice) => {
    switch (choice) {
      case 'rock':
        return 'circle.fill';
      case 'paper':
        return 'doc.fill';
      case 'scissors':
        return 'scissors';
      default:
        return 'questionmark';
    }
  };
  
  const getChoiceColor = (choice: Choice) => {
    switch (choice) {
      case 'rock':
        return rockColor;
      case 'paper':
        return paperColor;
      case 'scissors':
        return scissorsColor;
      default:
        return '#CCCCCC';
    }
  };
  
  const getResultText = () => {
    switch (result) {
      case 'win':
        return 'You Win!';
      case 'lose':
        return 'You Lose!';
      case 'draw':
        return "It's a Draw!";
      default:
        return '';
    }
  };
  
  const getResultColor = () => {
    switch (result) {
      case 'win':
        return '#4CAF50';
      case 'lose':
        return '#F44336';
      case 'draw':
        return '#FFC107';
      default:
        return 'transparent';
    }
  };
  
  const translateX = shake.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [0, -10, 10, -10, 10, 0]
  });
  
  return (
    <>
      <Stack.Screen options={{ title: 'Rock Paper Scissors' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.instructions}>
          Choose rock, paper, or scissors to play against the computer!
        </ThemedText>
        
        <ThemedView style={styles.gameContainer}>
          <ThemedView style={styles.choicesContainer}>
            <Animated.View
              style={[
                styles.playerChoice,
                { transform: isPlaying ? [{ translateX }] : [] }
              ]}
            >
              <ThemedText style={styles.playerLabel}>You</ThemedText>
              <View style={[styles.choiceCircle, { backgroundColor: getChoiceColor(userChoice) }]}>
                {userChoice ? (
                  <IconSymbol size={48} name={getChoiceIcon(userChoice)} color="#000" />
                ) : (
                  <ThemedText>?</ThemedText>
                )}
              </View>
            </Animated.View>
            
            <ThemedText style={styles.versusText}>VS</ThemedText>
            
            <ThemedView style={styles.computerChoice}>
              <ThemedText style={styles.computerLabel}>Computer</ThemedText>
              <Animated.View
                style={[
                  styles.choiceCircle,
                  { backgroundColor: getChoiceColor(computerChoice) },
                  { transform: isPlaying ? [{ translateX }] : [] }
                ]}
              >
                {computerChoice ? (
                  <IconSymbol size={48} name={getChoiceIcon(computerChoice)} color="#000" />
                ) : (
                  <ThemedText>?</ThemedText>
                )}
              </Animated.View>
            </ThemedView>
          </ThemedView>
          
          {result && (
            <ThemedView style={[styles.resultContainer, { backgroundColor: getResultColor() }]}>
              <ThemedText style={styles.resultText}>{getResultText()}</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
        
        <ThemedView style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.choiceButton, { backgroundColor: rockColor }]}
            onPress={() => handleUserChoice('rock')}
            disabled={isPlaying}
          >
            <IconSymbol size={32} name="circle.fill" color="#000" />
            <ThemedText style={styles.choiceButtonText}>Rock</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.choiceButton, { backgroundColor: paperColor }]}
            onPress={() => handleUserChoice('paper')}
            disabled={isPlaying}
          >
            <IconSymbol size={32} name="doc.fill" color="#000" />
            <ThemedText style={styles.choiceButtonText}>Paper</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.choiceButton, { backgroundColor: scissorsColor }]}
            onPress={() => handleUserChoice('scissors')}
            disabled={isPlaying}
          >
            <IconSymbol size={32} name="scissors" color="#000" />
            <ThemedText style={styles.choiceButtonText}>Scissors</ThemedText>
          </TouchableOpacity>
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
  instructions: {
    textAlign: 'center',
    marginBottom: 24,
  },
  gameContainer: {
    flex: 1,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 40,
  },
  playerChoice: {
    alignItems: 'center',
  },
  computerChoice: {
    alignItems: 'center',
  },
  playerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  computerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  choiceCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
  },
  versusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  choiceButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  choiceButtonText: {
    marginTop: 8,
    fontWeight: '500',
  },
});