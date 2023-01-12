import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/components/ButtonSelectable';

const ButtonSelectable = ({
  value = 'Click me',
  select = false,
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
        ...(select && styles.buttonPressableSelect),
        ...customStyle,
      })}>
      <View style={styles.buttonWrapper}>
        <Text
          style={{
            ...styles.button,
            ...font,
            ...(select && styles.buttonSelect),
          }}>
          {value}
        </Text>
      </View>
    </Pressable>
  );
};

export default ButtonSelectable;
