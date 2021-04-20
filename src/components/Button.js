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
        ...(pressed
          ? styles.buttonPressablePressed
          : styles.buttonPressableDefault),
        ...customStyle,
      })}>
      <View style={styles.buttonWrapper}>
        <Text style={{ ...styles.button, ...font }}>{value}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
