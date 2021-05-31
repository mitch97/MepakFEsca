import React, { useContext, useState, useEffect } from 'react';
import { View, SectionList, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ButtonSelectable,
  Button,
  OrderDetailRow,
  Section,
  Separator,
  NumberPicker,
} from '../components';
import styles from '../stylesheets/views/OrderDetail';
import { Fonts } from '../stylesheets/constant';
import { Status } from '../utils/OrderStatus';

import Api, { BASE_URL, API_PATH, ORDER_PATH, ORDER_STATUS_PATH } from '../api';

import OrderContext from '../context/OrderContext';
import NavigationContext, { Constants } from '../context/NavigationContext';

const EditModal = ({
  order,
  visible,
  onClose,
  onChangeQuantity = () => {},
  onAddNote = () => {},
  onSegue = () => {},
}) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={styles.modalContainer}>
      <View style={styles.modalWrapper}>
        <NumberPicker
          initial={order.quantity}
          style={styles.modalNumberPicker}
          onChange={onChangeQuantity}
        />
        <View style={styles.modalExtraWrapper}>
          <ButtonSelectable
            style={styles.modalSegue}
            select={order.segue}
            value="a Seguire"
            onClick={onSegue}
          />
          <ButtonSelectable
            style={styles.modalAddNotes}
            value="Note"
            onClick={onAddNote}
          />
        </View>
        <Button value="Chiudi" onClick={onClose} />
      </View>
    </View>
  </Modal>
);

const OrderDetailscreen = ({
  navigation,
  route: { params: { order: orderId } = {} },
}) => {
  const { order, removeProductToOrder, setOrder, table, flush } = useContext(
    OrderContext,
  );
  const { navigationConstant, setNavigationConstant } = useContext(
    NavigationContext,
  );
  const [sectionOrder, setSectionOrder] = useState();
  const [modalVisibile, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [orderFromServer, setOrderFromServer] = useState();
  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   console.log('--navigation.back, OrderDetailscreen--', navigationConstant);
  //   switch (navigationConstant) {
  //     case Constants.RETURN_TO_HOME:
  //       navigation.popToTop();
  //       break;
  //     default:
  //       break;
  //   }
  // }, [navigation, navigationConstant]);

  useEffect(() => {
    if (!orderId) {
      const _sectionOrder = [];
      const { info, ...allOrder } = order;
      const orders = Object.values(allOrder);

      const mains = orders.filter(({ segue }) => !segue);
      if (mains && mains.length)
        _sectionOrder.push({ title: 'Principale', data: mains });
      const segues = orders.filter(({ segue }) => segue);
      if (segues && segues.length)
        _sectionOrder.push({ title: 'a Seguire', data: segues });

      setSectionOrder(_sectionOrder);
    }
  }, [order, orderId]);

  useEffect(() => {
    if (orderId) {
      const effect = async () => {
        const _orderFromServer = await Api.get(
          `${BASE_URL}${API_PATH}${ORDER_PATH(orderId)}`,
        );

        const { food, drink } = _orderFromServer;
        const mains = [];
        const segues = [];

        const _sectionOrder = [];
        let _detailOrder = {
          info: {
            _id: _orderFromServer._id,
            table: _orderFromServer.table,
            status: _orderFromServer.status,
            segue: _orderFromServer.segue,
          },
        };
        setOrderFromServer(_detailOrder.info);
        if (food && food.main && food.main.length) {
          mains.push(...food.main);
          _detailOrder = food.main.reduce(
            (previousDetailOrder, currentOrder) => ({
              ...previousDetailOrder,
              [currentOrder._id]: currentOrder,
            }),
            _detailOrder,
          );
        }
        if (drink && drink.main && drink.main.length) {
          mains.push(...drink.main);
          _detailOrder = drink.main.reduce(
            (previousDetailOrder, currentOrder) => ({
              ...previousDetailOrder,
              [currentOrder._id]: currentOrder,
            }),
            _detailOrder,
          );
        }
        if (mains.length)
          _sectionOrder.push({ title: 'Principale', data: mains });

        if (food && food.segue && food.segue.length) {
          segues.push(...food.segue);
          _detailOrder = food.segue.reduce(
            (previousDetailOrder, currentOrder) => ({
              ...previousDetailOrder,
              [currentOrder._id]: { ...currentOrder, segue: true },
            }),
            _detailOrder,
          );
        }
        if (drink && drink.segue && drink.segue.length) {
          segues.push(...drink.segue);
          _detailOrder = drink.segue.reduce(
            (previousDetailOrder, currentOrder) => ({
              ...previousDetailOrder,
              [currentOrder._id]: { ...currentOrder, segue: true },
            }),
            _detailOrder,
          );
        }
        if (segues.length)
          _sectionOrder.push({ title: 'a Seguire', data: segues });

        setOrder(_detailOrder);
        setSectionOrder(_sectionOrder);
      };
      effect();
    }
  }, [orderId, setOrder]);

  // useEffect(() => {
  //   if (sectionOrder && sectionOrder.every(({ data }) => !data.length))
  //     navigation.goBack();
  // }, [navigation, sectionOrder]);

  const renderSectionHeader = ({ section: { title } }) => (
    <Section title={title} />
  );
  const renderItem = ({ item: { _id, name, quantity, note } }) => (
    <OrderDetailRow
      title={name}
      quantity={quantity}
      notes={note}
      onClick={() => !orderId && onSelectOrder(_id)}
      editable={!orderId}
    />
  );
  const keyExtractor = item => item._id;

  const onSelectOrder = _id => {
    setSelectedOrder(_id);
    setModalVisible(true);
  };

  const onChangeQuantity = ({ sign }) => {
    const key = selectedOrder;
    const quantity = order[key]?.quantity;

    if (sign === '-') {
      if (quantity === 1) {
        setModalVisible(false);
        setSelectedOrder(undefined);
        removeProductToOrder(key);
      } else {
        setOrder(_order => ({
          ..._order,
          [key]: { ..._order[key], quantity: _order[key].quantity - 1 },
        }));
      }
    } else if (sign === '+') {
      setOrder(_order => ({
        ..._order,
        [key]: { ..._order[key], quantity: _order[key].quantity + 1 },
      }));
    }
  };

  const onSegue = () => {
    setOrder(_order => ({
      ..._order,
      [selectedOrder]: {
        ..._order[selectedOrder],
        segue: !_order[selectedOrder].segue,
      },
    }));
  };

  const onAddNotes = () => {
    setModalVisible(false);
    navigation.navigate('Note', { product: selectedOrder });
  };

  const prepareOrderForServer = async () => {
    const { info, ...allOrder } = order;
    const orders = Object.values(allOrder);

    const main = orders.filter(({ segue: segueMain }) => !segueMain);
    const segue = orders.filter(({ segue: segueSegue }) => segueSegue);

    const mainFood = main.filter(({ category: { type } }) => type === 'food');
    const mainDrink = main.filter(({ category: { type } }) => type === 'drink');
    const segueFood = segue
      .filter(({ category: { type } }) => type === 'food')
      .map(({ segue, ...other }) => other);
    const segueDrink = segue
      .filter(({ category: { type } }) => type === 'drink')
      .map(({ segue, ...other }) => other);

    let food;
    if (mainFood && mainFood.length && segueFood && segueFood.length)
      food = { main: mainFood, segue: segueFood };
    else if (mainFood && mainFood.length) food = { main: mainFood };
    else if (segueFood && segueFood.length) food = { main: segueFood };

    let drink;
    if (mainDrink && mainDrink.length && segueDrink && segueDrink.length)
      drink = { main: mainDrink, segue: segueDrink };
    else if (mainDrink && mainDrink.length) drink = { main: mainDrink };
    else if (segueDrink && segueDrink.length) drink = { main: segueDrink };

    const body = { table, food, drink };
    try {
      if (info) {
        const responseUpdateOrder = await Api.put(
          `${BASE_URL}${API_PATH}${ORDER_PATH(info._id)}`,
          { ...body, table: info.table },
        );

        if (responseUpdateOrder) {
          flush();
          setNavigationConstant(Constants.RETURN_TO_HOME);
          navigation.popToTop();
        }
      } else {
        const responseAddOrder = await Api.post(
          `${BASE_URL}${API_PATH}${ORDER_PATH()}`,
          body,
        );

        if (responseAddOrder) {
          flush();
          setNavigationConstant(Constants.RETURN_TO_HOME);
          navigation.popToTop();
        }
      }
    } catch (e) {}
  };

  const changeStatusOrder = async () => {
    const response = await Api.put(
      `${BASE_URL}${API_PATH}${ORDER_STATUS_PATH(orderFromServer._id)}`,
    );
    if (response && response._id) {
      setNavigationConstant(Constants.RETURN_TO_HOME);
      navigation.popToTop();
    }
  };

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
      {!orderId && (
        <View style={{ ...styles.buttonWrapper, paddingBottom: insets.bottom }}>
          <Button
            value="Conferma ordine"
            font={Fonts.FONT_SEMIBOLD}
            style={styles.button}
            onClick={prepareOrderForServer}
          />
        </View>
      )}
      {orderFromServer && orderFromServer.status === Status.DELIVERY && (
        <View style={{ ...styles.buttonWrapper, paddingBottom: insets.bottom }}>
          <Button
            value={
              orderFromServer.segue ? 'Prepara il Segue' : 'Termina ordine'
            }
            font={Fonts.FONT_SEMIBOLD}
            style={styles.button}
            onClick={changeStatusOrder}
          />
        </View>
      )}
      {orderFromServer && orderFromServer.status === Status.DELIVERY_SEGUE && (
        <View style={{ ...styles.buttonWrapper, paddingBottom: insets.bottom }}>
          <Button
            value="Termina ordine"
            font={Fonts.FONT_SEMIBOLD}
            style={styles.button}
            onClick={changeStatusOrder}
          />
        </View>
      )}
      {selectedOrder && order[selectedOrder] && (
        <EditModal
          order={order[selectedOrder]}
          visible={modalVisibile}
          onClose={() => setModalVisible(false)}
          onChangeQuantity={onChangeQuantity}
          onSegue={onSegue}
          onAddNote={onAddNotes}
        />
      )}
    </View>
  );
};

export default OrderDetailscreen;
