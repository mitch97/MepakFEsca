import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 20,
  },
  loginWrapper: {
    height: '40%',
    borderRadius: 30,
    padding: 20,
    backgroundColor: Constants.CARD_BACKGROUND,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  submitWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  username: {
    marginBottom: 20,
  },
  submit: {
    marginTop: 60,
  },
});
