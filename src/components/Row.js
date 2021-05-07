import React from 'react';
import { View, Pressable } from 'react-native';
import { Label, ButtonSelectable, NumberPicker, Icon } from '../components';
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
    <View style={styles.rowProductInfoWrapper}>
      <Label font={Fonts.FONT_SEMIBOLD} style={styles.rowProductTitle}>
        {title}
      </Label>
      {price && (
        <Label font={Fonts.FONT_SEMIBOLD} style={styles.rowProductPrice}>
          {`${price.currency} ${price.value}`}
        </Label>
      )}
    </View>
    <Label style={styles.rowProductSubtitle}>{subtitle}</Label>
    <ButtonSelectable
      style={styles.rowProductSelect}
      select={quantity > 0}
      value="Seleziona"
      onClick={onSelect}
    />
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
  </View>
);

const Order = ({ title, quantity, notes, onClick = () => {} }) => (
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
      <Icon
        style={styles.orderDetailMore}
        name={'back'}
        size={Constants.ICON_SIZE_SMALL}
        color={Constants.INPUT_PLACEHOLDER_COLOR}
      />
    </View>
  </Pressable>
);

const Section = ({ title }) => (
  <View style={styles.section}>
    <Label font={Fonts.FONT_SEMIBOLD} style={styles.sectionTitle}>
      {title}
    </Label>
  </View>
);
const Separator = () => <View style={styles.separator} />;

export { Product, Order, Separator, Section };
