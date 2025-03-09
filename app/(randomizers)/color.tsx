import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Share } from 'react-native';
import { Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ColorRandomizer() {
  const [color, setColor] = useState('#E0BBE4'); // Initial color
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const buttonBackground = useThemeColor({ light: '#E0BBE4', dark: '#604565' });
  const actionIconColor = useThemeColor({ light: '#333333', dark: '#FFFFFF' });
  
  const generateRandomColor = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsGenerating(true);
    
    // Generate a random hex color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    // Add to history (keep only last 10)
    setColorHistory(prevHistory => {
      const newHistory = [randomColor, ...prevHistory];
      return newHistory.slice(0, 10);
    });
    
    setColor(randomColor);
    setIsGenerating(false);
  };
  
  const shareColor = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `Check out this color: ${color}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const copyToClipboard = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // In a real app, we'd use Clipboard.setString from expo-clipboard
    // But for this demo, we'll just show a simulated success
  };
  
  // Convert hex to RGB for display
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `RGB: ${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
      'Invalid color';
  };
  
  return (
    <>
      <Stack.Screen options={{ title: 'Random Color' }} />
      <ThemedView style={styles.container}>
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
        
        <ThemedView style={styles.colorInfoContainer}>
          <ThemedText style={styles.colorHex}>{color.toUpperCase()}</ThemedText>
          <ThemedText style={styles.colorRgb}>{hexToRgb(color)}</ThemedText>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={copyToClipboard}
            >
              <IconSymbol size={24} name="doc.on.doc" color={actionIconColor} />
              <ThemedText style={styles.actionText}>Copy</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={shareColor}
            >
              <IconSymbol size={24} name="square.and.arrow.up" color={actionIconColor} />
              <ThemedText style={styles.actionText}>Share</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
        
        <TouchableOpacity
          style={[styles.generateButton, { backgroundColor: buttonBackground }]}
          onPress={generateRandomColor}
          disabled={isGenerating}
        >
          <ThemedText style={styles.generateButtonText}>
            Generate New Color
          </ThemedText>
        </TouchableOpacity>
        
        {colorHistory.length > 0 && (
          <ThemedView style={styles.historyContainer}>
            <ThemedText style={styles.historyTitle}>History</ThemedText>
            <View style={styles.historyColors}>
              {colorHistory.map((historyColor, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.historyColorItem, { backgroundColor: historyColor }]}
                  onPress={() => setColor(historyColor)}
                />
              ))}
            </View>
          </ThemedView>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  colorPreview: {
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorInfoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  colorHex: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  colorRgb: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
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
  historyContainer: {
    marginTop: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  historyColors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyColorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});