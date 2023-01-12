import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: Constants.CARD_BACKGROUND,
  },
  noteWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  note: {
    height: 200,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonWrapper: {
    backgroundColor: Constants.BUTTON_BACKGROUND,
  },
  button: {
    fontSize: 20,
  },
});
