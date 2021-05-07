import React, { useContext, useState, useEffect } from 'react';
import { View, SectionList, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Label,
  Button,
  OrderDetailRow,
  Section,
  Separator,
  NumberPicker,
} from '../components';
import styles from '../stylesheets/views/OrderDetail';
import { Fonts } from '../stylesheets/constant';

import OrderContext from '../context/OrderContext';

const EditModal = ({ visible, onClose }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={styles.modalContainer}>
      <View style={styles.modalWrapper}>
        <NumberPicker />
        <Button value="Chiudi" onClick={onClose} />
      </View>
    </View>
  </Modal>
);

const OrderDetailscreen = () => {
  const { order } = useContext(OrderContext);
  const [sectionOrder, setSeactionOrder] = useState();
  const [modalVisibile, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const _sectionOrder = [];
    const orders = Object.values(order);

    const mains = orders.filter(({ segue }) => !segue);
    if (mains && mains.length)
      _sectionOrder.push({ title: 'Principale', data: mains });
    const segues = orders.filter(({ segue }) => segue);
    if (segues && segues.length)
      _sectionOrder.push({ title: 'a Seguire', data: segues });

    setSeactionOrder(_sectionOrder);
  }, [order]);

  const renderSectionHeader = ({ section: { title } }) => (
    <Section title={title} />
  );
  const renderItem = ({ item: { _id, name, quantity } }) => (
    <OrderDetailRow
      title={name}
      quantity={quantity}
      notes={order[_id].note}
      onClick={() => setModalVisible(true)}
    />
  );
  const keyExtractor = item => item._id;

  return (
    <View style={styles.wrapper}>
      {sectionOrder && (
        <SectionList
          sections={sectionOrder}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
          renderSectionHeader={renderSectionHeader}
        />
      )}
      <View style={{ ...styles.buttonWrapper, paddingBottom: insets.bottom }}>
        <Button
          value="Conferma ordine"
          font={Fonts.FONT_SEMIBOLD}
          style={styles.button}
        />
      </View>
      <EditModal
        visible={modalVisibile}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default OrderDetailscreen;
