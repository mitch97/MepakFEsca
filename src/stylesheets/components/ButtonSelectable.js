import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  buttonPressableDefault: {
    backgroundColor: 'transparent',
    borderColor: Constants.BUTTON_BACKGROUND,
    borderWidth: 2,
    borderRadius: 62,
  },
  buttonPressablePressed: {
    opacity: 0.7,
  },
  buttonPressableSelect: {
    backgroundColor: Constants.BUTTON_BACKGROUND,
  },
  buttonWrapper: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: Constants.BUTTON_BACKGROUND,
  },
  buttonSelect: {
    color: Constants.BUTTON_COLOR,
  },
});
