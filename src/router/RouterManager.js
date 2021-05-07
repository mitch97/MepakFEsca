import React, { useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from '../stylesheets/constant';

import AuthContext from '../context/AuthContext';
import OrderContext from '../context/OrderContext';

import { Icon } from '../components';

import Signscreen from '../views/Signscreen';
import Categoryscreen from '../views/Categoryscreen';
import Productscreen from '../views/Productscreen';
import Notescreen from '../views/Notescreen';
import OrderDetailscreen from '../views/OrderDetailscreen';

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
});

const withoutHeader = { headerShown: false };
const transparentHeader = ({ order } = {}) => ({
  route: { name },
  navigation,
}) => ({
  headerTitle: '',
  headerLeft: ({ canGoBack }) =>
    canGoBack && (
      <Pressable
        onPress={navigation.goBack}
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
  headerRight: () =>
    order &&
    Object.keys(order).length > 0 &&
    name !== 'OrderDetail' && (
      <Pressable
        onPress={() => navigation.push('OrderDetail')}
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
});

const Stack = createStackNavigator();
const RouterManager = () => {
  const { userToken } = useContext(AuthContext);
  const { order } = useContext(OrderContext);

  return (
    <Stack.Navigator>
      {!userToken && (
        <Stack.Screen
          name="Sign"
          component={Signscreen}
          options={withoutHeader}
        />
      )}
      <Stack.Screen
        name="Category"
        component={Categoryscreen}
        options={transparentHeader({ order })}
      />
      <Stack.Screen
        name="Product"
        component={Productscreen}
        options={transparentHeader({ order })}
      />
      <Stack.Screen
        name="Note"
        component={Notescreen}
        options={transparentHeader()}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailscreen}
        options={transparentHeader({ order })}
      />
    </Stack.Navigator>
  );
};
export default RouterManager;
