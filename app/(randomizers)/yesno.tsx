import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function YesNoRandomizer() {
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const opacityAnim = useState(new Animated.Value(1))[0];
  
  const buttonBackground = useThemeColor({ light: '#E2F0CB', dark: '#5A7841' });
  
  const generateAnswer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsGenerating(true);
    setResult(null);
    
    // Animation to make the button "bounce"
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start();
    
    // Fade out any previous result
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    
    // Show suspense by waiting a bit before showing the result
    setTimeout(() => {
      const answer = Math.random() >= 0.5 ? 'YES' : 'NO';
      setResult(answer);
      setIsGenerating(false);
      
      // Animate the new result coming in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      // Provide haptic feedback based on the result
      if (answer === 'YES') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }, 800);
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Yes or No' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.questionText}>
          Ask a question and tap the button for an answer
        </ThemedText>
        
        <Animated.View 
          style={{ 
            transform: [{ scale: scaleAnim }],
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[styles.generateButton, { backgroundColor: buttonBackground }]}
            onPress={generateAnswer}
            disabled={isGenerating}
          >
            <ThemedText style={styles.generateButtonText}>
              Get Answer
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={[styles.resultContainer, { opacity: opacityAnim }]}>
          {result ? (
            <ThemedView style={[
              styles.answerContainer,
              { backgroundColor: result === 'YES' ? '#8BC34A' : '#FF5252' }
            ]}>
              <ThemedText style={styles.answerText}>
                {result}
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedText style={styles.waitingText}>
              {isGenerating ? 'Thinking...' : 'Your answer will appear here'}
            </ThemedText>
          )}
        </Animated.View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  generateButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  answerContainer: {
    width: 200,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  waitingText: {
    opacity: 0.5,
    fontSize: 16,
  },
});