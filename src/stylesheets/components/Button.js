import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  buttonPressableDefault: {
    backgroundColor: Constants.BUTTON_BACKGROUND,
    borderRadius: 62,
  },
  buttonPressablePressed: {
    opacity: 0.7,
  },
  buttonWrapper: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: Constants.BUTTON_COLOR,
  },
});
