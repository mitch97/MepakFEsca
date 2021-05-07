import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  orderPressableDefault: {
    backgroundColor: Constants.BUTTON_BACKGROUND,
    borderTopLeftRadius: 62,
    borderTopRightRadius: 62,
  },
  orderPressablePressed: {
    opacity: 0.7,
  },
  orderWrapper: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
