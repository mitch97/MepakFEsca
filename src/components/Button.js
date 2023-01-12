import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/components/Button';

const Button = ({
  value = 'Click me',
  font = Fonts.FONT_SEMIBOLD,
  onClick = () => {},
  style: customStyle,
}) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => ({
        ...styles.buttonPressableDefault,
        ...(pressed && styles.buttonPressablePressed),
      })}>
      <View style={styles.buttonWrapper}>
        <Text style={{ ...styles.button, ...font, ...customStyle }}>
          {value}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
