import { StyleSheet } from 'react-native';
import { Constants, Shadows } from '../constant';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonWrapper: {
    backgroundColor: Constants.BUTTON_BACKGROUND,
  },
  button: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.MODAL_BACKGROUND,
  },
  modalWrapper: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: Constants.CARD_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 20,
    ...Shadows.MODAL,
  },
  modalNumberPicker: {
    marginBottom: 20,
  },
  modalExtraWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  modalSegue: {
    width: '45%',
  },
  modalAddNotes: {
    width: '45%',
  },
});
