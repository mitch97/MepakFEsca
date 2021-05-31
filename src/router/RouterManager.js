import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants, Fonts } from '../stylesheets/constant';

import { Status } from '../utils/OrderStatus';

import AuthContext from '../context/AuthContext';
import OrderContext from '../context/OrderContext';

import { Icon, Label } from '../components';

import Signscreen from '../views/Signscreen';
import Tablescreen from '../views/Tablescreen';
import Categoryscreen from '../views/Categoryscreen';
import Productscreen from '../views/Productscreen';
import Notescreen from '../views/Notescreen';
import OrderDetailscreen from '../views/OrderDetailscreen';
import GroupedOrderscreen from '../views/GroupedOrderscreen';

const transparentHeaderStyles = StyleSheet.create({
  backPressableDefault: {
    opacity: 1,
  },
  backPressablePressed: {
    opacity: 0.7,
  },
  wrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 30,
  },
  title: {
    ...Fonts.FONT_SEMIBOLD,
    fontSize: 20,
  },
});

const withoutHeader = { headerShown: false };
const defaultHeader = ({ navigation, flush } = {}) => {
  const onBack = () => {
    flush && flush();
    navigation.goBack();
  };

  return {
    headerTitle: '',
    headerLeft: ({ canGoBack }) =>
      canGoBack && (
        <Pressable
          onPress={onBack}
          style={({ pressed }) => ({
            ...(pressed
              ? transparentHeaderStyles.backPressablePressed
              : transparentHeaderStyles.backPressableDefault),
          })}>
          <View style={transparentHeaderStyles.wrapper}>
            <Icon
              name="back"
              size={Constants.ICON_SIZE_MEDIUM}
              color={Constants.INPUT_PLACEHOLDER_COLOR}
            />
          </View>
        </Pressable>
      ),
  };
};
const titleHeader = ({ table } = {}) => ({
  headerTitle: () => (
    <Label style={transparentHeaderStyles.title}>{`Tavolo #${table}`}</Label>
  ),
});
const confirmOrderHeader = ({ navigation }) => {
  const onConfirmOrder = () => navigation.push('RecapOrderDetail');
  return {
    headerRight: () => (
      <Pressable
        onPress={onConfirmOrder}
        style={({ pressed }) => ({
          ...(pressed
            ? transparentHeaderStyles.backPressablePressed
            : transparentHeaderStyles.backPressableDefault),
        })}>
        <View style={transparentHeaderStyles.wrapper}>
          <Icon
            name="order"
            size={Constants.ICON_SIZE_MEDIUM}
            color={Constants.INPUT_PLACEHOLDER_COLOR}
          />
        </View>
      </Pressable>
    ),
  };
};
const editOrderHeader = ({ navigation }) => {
  const onEditOrder = () => navigation.navigate('Category');
  return {
    headerRight: () => (
      <Pressable
        onPress={onEditOrder}
        style={({ pressed }) => ({
          ...(pressed
            ? transparentHeaderStyles.backPressablePressed
            : transparentHeaderStyles.backPressableDefault),
        })}>
        <View style={transparentHeaderStyles.wrapper}>
          <Icon
            name="edit"
            size={Constants.ICON_SIZE_MEDIUM}
            color={Constants.INPUT_PLACEHOLDER_COLOR}
          />
        </View>
      </Pressable>
    ),
  };
};

const Stack = createStackNavigator();
const RouterManager = () => {
  const { userToken } = useContext(AuthContext);
  const { order, flush, table } = useContext(OrderContext);

  return (
    <Stack.Navigator>
      {!userToken && (
        <Stack.Screen
          name="Sign"
          component={Signscreen}
          options={withoutHeader}
        />
      )}
      {Platform.isPad && (
        <Stack.Screen
          name="GroupedOrder"
          component={GroupedOrderscreen}
          options={() => ({ ...defaultHeader({ order }) })}
        />
      )}
      <Stack.Screen
        name="Table"
        component={Tablescreen}
        options={() => ({ ...defaultHeader({ order }) })}
      />
      <Stack.Screen
        name="Category"
        component={Categoryscreen}
        options={({ navigation }) => ({
          ...defaultHeader({ navigation, order, flush }),
          ...titleHeader({
            navigation,
            table: table || (order.info && order.info.table),
          }),
        })}
      />
      <Stack.Screen
        name="Product"
        component={Productscreen}
        options={({ navigation }) => {
          let header = defaultHeader({ navigation, order });
          if (Object.keys(order).length)
            header = { ...header, ...confirmOrderHeader({ navigation }) };

          return header;
        }}
      />
      <Stack.Screen
        name="Note"
        component={Notescreen}
        options={({ navigation }) => ({
          ...defaultHeader({ navigation, order }),
        })}
      />
      <Stack.Screen
        name="RecapOrderDetail"
        component={OrderDetailscreen}
        options={({ navigation }) => {
          const header = defaultHeader({ navigation, order });
          return header;
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailscreen}
        options={({ navigation }) => {
          let header = defaultHeader({ navigation, order, flush });
          if (order.info && order.info.status === Status.VOID)
            header = { ...header, ...editOrderHeader({ navigation }) };

          return header;
        }}
      />
    </Stack.Navigator>
  );
};
export default RouterManager;
