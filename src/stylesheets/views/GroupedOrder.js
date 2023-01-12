import { StyleSheet } from 'react-native';
import { Constants, Shadows } from '../constant';

export default StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  groupedOrderColumns: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  detailOrderColumns: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
});
