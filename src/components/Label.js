import React from 'react';
import { Text } from 'react-native';
import { Fonts } from '../stylesheets/constant';

const Label = ({ children, font = Fonts.FONT_REGULAR, style: customStyle }) => {
  return <Text style={{ ...font, ...customStyle }}>{children}</Text>;
};

export default Label;
