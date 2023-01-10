import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styles from '../stylesheets/views/GroupedOrder';
import usePolling from '../hooks/usePolling';

import Api, {
  BASE_URL,
  API_PATH,
  AGGREGATE_ORDERS_PATH,
  ORDERS_PATH,
  AGGREGATE_ORDER_PATH,
} from '../api';

import { OrderGroupedRow, Separator, TotalOrderRow } from '../components';
import { Status, StatusOrder } from '../utils/OrderStatus';

import socketIOClient from 'socket.io-client';

const GroupedOrderscreen = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isPolling, startPolling, stopPolling] = usePolling({
    interval: 5000,
    onTick: () => downloadOrders(),
  });

  useEffect(() => {
    downloadOrders();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    socket.on('order', data => {
      console.log(data);
    });
  }, []);

  const downloadOrders = async () => {
    const groupedOrdersFromServer = await Api.get(
      // `${BASE_URL}${API_PATH}${AGGREGATE_ORDERS_PATH}?type=drink`,
      `${BASE_URL}${API_PATH}${AGGREGATE_ORDERS_PATH}`,
    );
    setGroupedOrders(
      groupedOrdersFromServer.sort(
        ({ status: status1 }, { status: status2 }) =>
          StatusOrder[status1] > StatusOrder[status2],
      ),
    );

    const ordersFromServer = await Api.get(
      `${BASE_URL}${API_PATH}${ORDERS_PATH({
        status:
          'aggregate,working,request_segue,delivery,aggregate_segue,working_segue,delivery_segue',
        // type: 'drink',
      })}`,
    );
    setOrders(
      ordersFromServer.sort(
        ({ status: status1 }, { status: status2 }) =>
          StatusOrder[status1] > StatusOrder[status2],
      ),
    );
  };

  const onChangeStatus = async ({ _id }) => {
    const orderFromServer = await Api.put(
      `${BASE_URL}${API_PATH}${AGGREGATE_ORDER_PATH(_id)}`,
    );
    if (orderFromServer && orderFromServer._id) downloadOrders();
  };

  const renderGroupedOrderItem = ({ item: { _id, food, drink, status } }) => (
    <OrderGroupedRow
      datas={food || drink}
      status={status}
      onClick={() => onChangeStatus({ _id, status })}
    />
  );
  const renderOrderItem = ({ item: { table, food, drink, status } }) => {
    if (food)
      return (
        <TotalOrderRow
          table={table}
          food={
            [
              Status.REQUEST_SEGUE,
              Status.AGGREGATE_SEGUE,
              Status.WORKING_SEGUE,
            ].includes(status)
              ? food.segue
              : food.main
          }
          status={status}
        />
      );
    if (drink)
      return (
        <TotalOrderRow
          table={table}
          food={
            [
              Status.REQUEST_SEGUE,
              Status.AGGREGATE_SEGUE,
              Status.WORKING_SEGUE,
            ].includes(status)
              ? drink.segue
              : drink.main
          }
          status={status}
        />
      );
  };
  const keyExtractor = item => item._id;

  return (
    <View style={styles.wrapper}>
      <View style={styles.groupedOrderColumns}>
        <FlatList
          data={groupedOrders}
          renderItem={renderGroupedOrderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
        />
      </View>
      <View style={styles.detailOrderColumns}>
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
        />
      </View>
    </View>
  );
};
export default GroupedOrderscreen;
