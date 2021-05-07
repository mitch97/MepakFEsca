import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import styles from '../stylesheets/components/DismissKeyboardHOC';

const DismissKeyboardHOC = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.wrapper}>{children}</View>
  </TouchableWithoutFeedback>
);
export default DismissKeyboardHOC;
