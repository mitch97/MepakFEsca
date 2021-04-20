import React, { useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from '../stylesheets/constant';

import AuthContext from '../context/AuthContext';

import { Icon } from '../components';

import Signscreen from '../views/Signscreen';
import Categoryscreen from '../views/Categoryscreen';

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
const transparentHeader = {
  headerTransparent: true,
  headerTitle: null,
  headerLeft: ({ canGoBack, goBack }) =>
    canGoBack && (
      <Pressable
        onPress={goBack}
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

const Stack = createStackNavigator();
const RouterManager = () => {
  const { userToken } = useContext(AuthContext);

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
        options={transparentHeader}
      />
    </Stack.Navigator>
  );
};
export default RouterManager;
