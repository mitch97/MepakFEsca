import { StyleSheet } from 'react-native';
import { Constants } from '../constant';

export default StyleSheet.create({
  rowProductPressableDefault: {
    backgroundColor: Constants.CARD_BACKGROUND,
  },
  rowProductPressablePressed: {
    backgroundColor: Constants.CARD_BACKGROUND,
    opacity: 0.7,
  },
  rowProductWrapper: {
    flex: 1,
    backgroundColor: Constants.CARD_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  rowProductInfoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowProductTitle: {
    fontSize: 30,
    maxWidth: '75%',
  },
  rowProductPrice: {
    fontSize: 20,
    maxWidth: '25%',
    marginTop: 10,
    marginBottom: 20,
  },
  rowProductSubtitle: {
    fontSize: 12,
  },
  rowProductSelect: {
    marginVertical: 20,
  },
  rowProductSelectWrapper: {
    marginVertical: 20,
  },
  rowProductExtraWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rowProductExtraSegue: {
    width: '30%',
  },
  rowProductExtraNote: {
    width: '30%',
  },
  orderDetailPressableDefault: {
    backgroundColor: Constants.CARD_BACKGROUND,
  },
  orderDetailPressablePressed: {
    backgroundColor: Constants.CARD_BACKGROUND,
    opacity: 0.7,
  },
  orderDetailContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Constants.CARD_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  orderDetailInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  orderDetailTitle: {
    fontSize: 20,
  },
  orderDetailQuantity: {
    fontSize: 25,
  },
  orderDetailMore: {
    transform: [{ rotate: '180deg' }],
  },
  orderDetailNotes: {
    fontSize: 12,
    marginTop: 10,
  },
  orderGroupedContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Constants.CARD_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 20,
  },
  orderGroupedWrapper: {
    marginVertical: 20,
  },
  orderGroupedInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  orderGroupedStatus: {
    fontSize: 25,
  },
  orderGroupedTitle: {
    fontSize: 20,
  },
  orderGroupedQuantity: {
    fontSize: 25,
  },
  orderGroupedTitleSmall: {
    fontSize: 15,
  },
  orderGroupedQuantitySmall: {
    fontSize: 20,
  },
  orderGroupedChooseWrapper: {
    width: '100%',
    marginTop: 30,
  },
  totalOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Constants.CARD_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 20,
  },
  totalOrderTable: {
    fontSize: 25,
  },
  totalOrderInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  totalOrderStatus: {
    fontSize: 20,
    marginTop: 20,
  },
  totalOrderTitle: {
    fontSize: 15,
  },
  totalOrderQuantity: {
    fontSize: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Constants.SEPARATOR_COLOR,
  },
  section: {
    backgroundColor: Constants.GENERIC_BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 30,
  },
});
