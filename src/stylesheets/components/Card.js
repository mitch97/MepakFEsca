import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

const width = '100%';
const height = 150;
export default StyleSheet.create({
  cardPressableDefault: {
    width,
    height,
    backgroundColor: Constants.CARD_BACKGROUND,
    borderRadius: 20,
  },
  cardPressablePressed: {
    width,
    height,
    backgroundColor: Constants.CARD_BACKGROUND,
    opacity: 0.7,
    borderRadius: 20,
  },
  cardWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  titleWrapper: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
  },
});
