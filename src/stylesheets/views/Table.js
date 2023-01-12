import { StyleSheet } from 'react-native';
import { Constants, Fonts } from '../constant';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  wrapperScene: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  cardWrapper: {
    flex: 1,
    flexBasis: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabbarWrapper: {
    backgroundColor: Constants.SEPARATOR_COLOR,
  },
  tabbarIndicator: {
    backgroundColor: Constants.CARD_BACKGROUND,
  },
  tabbarLabel: {
    ...Fonts.FONT_SEMIBOLD,
    color: Constants.BUTTON_COLOR,
    fontSize: 20,
  },
  tabbarStyle: {
    height: 75,
  },
});
