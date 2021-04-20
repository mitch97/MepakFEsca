import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  input: {
    height: 62,
    borderRadius: 62,
    backgroundColor: Constants.INPUT_BACKGROUND,
    color: Constants.INPUT_COLOR,
    paddingLeft: 30,
    paddingRight: 50,
  },
  iconWrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 'auto',
    right: 30,
  },
});
