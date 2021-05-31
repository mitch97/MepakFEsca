import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/components/NumberPicker';

const NumberPicker = ({
  initial = 0,
  font = Fonts.FONT_SEMIBOLD,
  onChange = () => {},
  style: customStyle,
}) => {
  const quantitySelector = (sign = '+') => (
    <Pressable
      onPress={() => onChange({ sign })}
      style={({ pressed }) => ({
        ...styles.quantitySelectorPressableDefault,
        ...(pressed && styles.quantitySelectorPressablePressed),
        ...(sign === '+'
          ? styles.quantitySelectorPressableRight
          : styles.quantitySelectorPressableLeft),
      })}>
      <View style={styles.quantitySelectorWrapper}>
        <Text style={{ ...styles.quantitySelectorLabel, ...font }}>{sign}</Text>
      </View>
    </Pressable>
  );
  return (
    <View style={{ ...styles.numberPickerWrapper, ...customStyle }}>
      {quantitySelector('-')}
      <View style={styles.numberPickerQuantityWrapper}>
        <Text style={{ ...styles.quantitySelectorLabel, ...font }}>
          {initial}
        </Text>
      </View>
      {quantitySelector('+')}
    </View>
  );
};

export default NumberPicker;
