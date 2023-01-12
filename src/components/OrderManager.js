import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/components/Button';

import OrderContext from '../context/OrderContext';

const OrderManager = ({ style: customStyle }) => {
  const { order } = useContext(OrderContext);

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.orderPressableDefault,
        ...(pressed && styles.orderPressablePressed),
        ...customStyle,
      })}>
      <View style={styles.orderWrapper}>
        <Text>{Object.keys(order).length}</Text>
        <Text>Dettaglio ordine</Text>
      </View>
    </Pressable>
  );
};

export default OrderManager;
