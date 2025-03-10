import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HeadsOrTailsRandomizer() {
  const [result, setResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  
  const buttonBackground = useThemeColor({ light: '#C7CEEA', dark: '#3E4973' });
  const coinHeadsColor = useThemeColor({ light: '#FFD700', dark: '#B8860B' });
  const coinTailsColor = useThemeColor({ light: '#C0C0C0', dark: '#707070' });
  
  const flipCoin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFlipping(true);
    setResult(null);
    
    // Reset animation
    flipAnimation.setValue(0);
    
    // Start flip animation
    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.bounce),
    }).start(({ finished }) => {
      if (finished) {
        const outcome = Math.random() >= 0.5 ? 'HEADS' : 'TAILS';
        setResult(outcome);
        setIsFlipping(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    });
  };
  
  // Create interpolated values for the flip animation
  const spin = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'] // Multiple full rotations
  });
  
  // Scale animation for more dynamic feel
  const scale = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1]
  });
  
  const renderCoin = () => {
    if (!result && !isFlipping) {
      return (
        <View style={[styles.coin, { backgroundColor: coinHeadsColor }]}>
          <ThemedText style={styles.coinInitialText}>Tap to flip</ThemedText>
        </View>
      );
    }
    
    const backgroundColor = result === 'HEADS' ? coinHeadsColor : coinTailsColor;
    
    return (
      <Animated.View 
        style={[
          styles.coin, 
          { backgroundColor },
          { 
            transform: [
              { rotateY: spin },
              { scale }
            ]
          }
        ]}
      >
        {!isFlipping && (
          <ThemedText style={styles.coinText}>
            {result}
          </ThemedText>
        )}
      </Animated.View>
    );
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Heads or Tails' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.coinContainer}>
          <TouchableOpacity
            disabled={isFlipping}
            onPress={flipCoin}
            style={styles.coinWrapper}
          >
            {renderCoin()}
          </TouchableOpacity>
        </ThemedView>
        
        <TouchableOpacity
          style={[styles.flipButton, { backgroundColor: buttonBackground }]}
          onPress={flipCoin}
          disabled={isFlipping}
        >
          <ThemedText style={styles.flipButtonText}>
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </ThemedText>
        </TouchableOpacity>
        
        <ThemedView style={styles.statsContainer}>
          <ThemedText style={styles.infoText}>
            Coin flips are completely random and have a 50/50 chance of landing on either side.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  coinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  coinWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coin: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  coinInitialText: {
    fontSize: 18,
    fontWeight: '600',
  },
  coinText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000', // Text on coin is always dark for contrast
  },
  flipButton: {
    height: 56,
    paddingHorizontal: 32,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  flipButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
    width: '100%',
  },
  infoText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});