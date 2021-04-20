import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from '../context/AuthContext';

import { Icon } from '../components/';

import Signscreen from '../views/Signscreen';
import Homescreen from '../views/Homescreen';

const withoutHeader = { headerShown: false };
const transparentHeader = {
  headerTransparent: true,
  headerTitle: null,
  headerLeft: () => <Icon name="back" />,
};

const Stack = createStackNavigator();
const RouterManager = () => {
  const { getToken } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!getToken() && (
        <Stack.Screen
          name="Sign"
          component={Signscreen}
          options={withoutHeader}
        />
      )}
      <Stack.Screen
        name="Home"
        component={Homescreen}
        options={transparentHeader}
      />
    </Stack.Navigator>
  );
};
export default RouterManager;
