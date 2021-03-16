import { StyleSheet } from 'react-native';
import Colors from '../../constant/Colors';

export default StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.white,
    marginRight: 10,
  },
});
