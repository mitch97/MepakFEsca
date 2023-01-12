import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  numberPickerWrapper: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySelectorPressableDefault: {
    borderColor: Constants.NUMBER_PICKER_SELECTOR,
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  quantitySelectorPressablePressed: {
    opacity: 0.7,
  },
  quantitySelectorPressableLeft: {
    borderTopLeftRadius: 62,
    borderBottomLeftRadius: 62,
  },
  quantitySelectorPressableRight: {
    borderTopRightRadius: 62,
    borderBottomRightRadius: 62,
  },
  quantitySelectorWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantitySelectorLabel: {
    fontSize: 40,
    color: Constants.NUMBER_PICKER_LABEL_COLOR,
  },
  numberPickerQuantityWrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Constants.NUMBER_PICKER_SELECTOR,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
