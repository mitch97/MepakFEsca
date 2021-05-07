import React from 'react';
import { View, Pressable } from 'react-native';
import { Constants, Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/components/Card';

import { Icon, Label } from '../components';

const Card = ({
  icon,
  title = 'Titolo',
  subtitle = 'Sottotitolo',
  onClick = () => {},
  style: customStyle,
}) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => ({
        ...styles.cardPressableDefault,
        ...(pressed && styles.cardPressablePressed),
        ...customStyle,
      })}>
      <View style={styles.cardWrapper}>
        <View style={styles.iconWrapper}>
          <Icon
            name={icon}
            size={Constants.ICON_SIZE_MEDIUM}
            color={Constants.INPUT_PLACEHOLDER_COLOR}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Label font={Fonts.FONT_SEMIBOLD} style={styles.title}>
            {title}
          </Label>
          <Label>{subtitle}</Label>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
