import React from 'react';
import { View, Pressable } from 'react-native';
import {
  Label,
  Button,
  ButtonSelectable,
  NumberPicker,
  Icon,
} from '../components';
import {
  statusToButton,
  statusToString,
  backgroundForStatus,
} from '../utils/OrderStatus';
import { Fonts, Constants } from '../stylesheets/constant';
import styles from '../stylesheets/components/Row';

const Product = ({
  title,
  subtitle,
  price = undefined,
  quantity = 0,
  segue = false,
  onSelect = () => {},
  onChangeQuantity = () => {},
  onAddSegue = () => {},
  onAddNote = () => {},
}) => (
  <View style={styles.rowProductWrapper}>
    {/* <View style={styles.rowProductInfoWrapper}> */}
    <Label font={Fonts.FONT_SEMIBOLD} style={styles.rowProductTitle}>
      {title}
    </Label>
    {price && (
      <Label font={Fonts.FONT_SEMIBOLD} style={styles.rowProductPrice}>
        {`${price.currency} ${price.value}`}
      </Label>
    )}
    {/* </View> */}
    <Label style={styles.rowProductSubtitle}>{subtitle}</Label>
    {quantity > 0 && (
      <View style={styles.rowProductSelectWrapper}>
        <NumberPicker initial={quantity} onChange={onChangeQuantity} />
        <View style={styles.rowProductExtraWrapper}>
          <ButtonSelectable
            style={styles.rowProductExtraSegue}
            select={segue}
            value="a Seguire"
            onClick={onAddSegue}
          />
          <ButtonSelectable
            style={styles.rowProductExtraNote}
            value="Note"
            onClick={onAddNote}
          />
        </View>
      </View>
    )}
    <ButtonSelectable
      style={styles.rowProductSelect}
      select={quantity > 0}
      value="Seleziona"
      onClick={onSelect}
    />
  </View>
);

const Order = ({
  title,
  quantity,
  notes,
  onClick = () => {},
  editable = true,
}) => (
  <Pressable
    onPress={onClick}
    style={({ pressed }) => ({
      ...styles.orderDetailPressableDefault,
      ...(pressed && styles.orderDetailPressablePressed),
    })}>
    <View style={styles.orderDetailContainer}>
      <View style={styles.orderDetailWrapper}>
        <View style={styles.orderDetailInfoWrapper}>
          <Label font={Fonts.FONT_SEMIBOLD} style={styles.orderDetailQuantity}>
            {`${quantity}x `}
          </Label>
          <Label font={Fonts.FONT_SEMIBOLD} style={styles.orderDetailTitle}>
            {title}
          </Label>
        </View>
        {notes && <Label style={styles.orderDetailNotes}>{notes}</Label>}
      </View>
      {editable && (
        <Icon
          style={styles.orderDetailMore}
          name={'back'}
          size={Constants.ICON_SIZE_SMALL}
          color={Constants.INPUT_PLACEHOLDER_COLOR}
        />
      )}
    </View>
  </Pressable>
);

const OrderGrouped = ({ status, datas, onClick = () => {} }) => (
  <View
    style={{
      ...styles.orderGroupedContainer,
      /* stylelint-disable function-name-case */
      backgroundColor: backgroundForStatus(status),
    }}>
    {statusToString(status, 'kitchen') && (
      <Label font={Fonts.FONT_SEMIBOLD} style={styles.orderGroupedStatus}>
        {statusToString(status, 'kitchen')}
      </Label>
    )}
    {datas.map(({ _id, quantity, name, orders }) => (
      <View style={styles.orderGroupedWrapper} key={_id}>
        <View style={styles.orderGroupedInfoWrapper}>
          <Label font={Fonts.FONT_SEMIBOLD} style={styles.orderGroupedQuantity}>
            {`${quantity}x `}
          </Label>
          <Label font={Fonts.FONT_REGULAR} style={styles.orderGroupedTitle}>
            {name}
          </Label>
        </View>
        {orders.map(
          ({ _id: orderId, product: { quantity: foodQuantity }, table }) => (
            <View style={styles.orderGroupedInfoWrapper} key={orderId}>
              <Label
                font={Fonts.FONT_SEMIBOLD}
                style={styles.orderGroupedQuantitySmall}>
                {`${foodQuantity}x `}
              </Label>
              <Label
                font={Fonts.FONT_REGULAR}
                style={styles.orderGroupedTitleSmall}>
                {`Tavolo #${table}`}
              </Label>
            </View>
          ),
        )}
      </View>
    ))}
    {statusToButton(status) && (
      <View style={styles.orderGroupedChooseWrapper}>
        <Button value={statusToButton(status)} onClick={onClick} />
      </View>
    )}
  </View>
);

const TotalOrder = ({ table, food, status }) => (
  <View style={styles.totalOrderContainer}>
    <Label font={Fonts.FONT_SEMIBOLD} style={styles.totalOrderTable}>
      {`Tavolo #${table}`}
    </Label>
    {food.map(({ _id, quantity, name }) => (
      <View style={styles.totalOrderInfoWrapper} key={_id}>
        <Label font={Fonts.FONT_SEMIBOLD} style={styles.totalOrderQuantity}>
          {`${quantity}x `}
        </Label>
        <Label font={Fonts.FONT_REGULAR} style={styles.totalOrderTitle}>
          {name}
        </Label>
      </View>
    ))}
    {statusToString(status, 'kitchen') && (
      <Label font={Fonts.FONT_SEMIBOLD} style={styles.totalOrderStatus}>
        {statusToString(status, 'kitchen')}
      </Label>
    )}
  </View>
);

const Section = ({ title }) => (
  <View style={styles.section}>
    <Label font={Fonts.FONT_SEMIBOLD} style={styles.sectionTitle}>
      {title}
    </Label>
  </View>
);
const Separator = () => <View style={styles.separator} />;

export { Product, Order, OrderGrouped, TotalOrder, Separator, Section };
