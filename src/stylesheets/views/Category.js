import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  scrollview: {
    height: '100%',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    flex: 1,
    flexBasis: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
