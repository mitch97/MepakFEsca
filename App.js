import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import useAuth from './src/hooks/useAuth';

import styles from './src/stylesheets/App';
import theme from './src/stylesheets/theme';

import Api, { BASE_URL, CONFIG_PATH } from './src/api';

import Store from './src/store';

import SplashScreenManager from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RouterManager from './src/router/RouterManager';

import AuthContext from './src/context/AuthContext';
import OrderContext from './src/context/OrderContext';
import NavigationContext from './src/context/NavigationContext';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState();
  const [order, setOrder] = useState({});
  const [table, setTable] = useState();
  const [navigationConstant, setNavigationConstant] = useState();

  // console.log('--order--', order);

  useEffect(() => {
    SplashScreenManager.hide();

    const effect = async () => {
      // Store.remove('Config', 'key = "appVersion"');
      // const config = await Api.get(`${BASE_URL}${CONFIG_PATH}`);
      // Store.insertMany(
      //   'Config',
      //   Object.keys(config)
      //     .filter(key => key !== 'appVersion')
      //     .map(key => ({ key, value: `${config[key]}` })),
      // );

      // const appVersion = Store.find('Config', 'key = "appVersion"');
      // if (appVersion && appVersion.length) {
      //   if (parseInt(appVersion[0], 10) < config.appVersion) {
      //     //TODO: Mostra un dialog se serve un aggiornamento
      //     Store.update('Config', 'key = "appVersion"', {
      //       key: 'appVersion',
      //       value: `${config.appVersion}`,
      //     });
      //   }
      // } else {
      //   Store.insert('Config', {
      //     key: 'appVersion',
      //     value: `${config.appVersion}`,
      //   });
      // }
      setUserToken(Store.findFirst('Token'));

      setLoading(false);
    };
    effect();
  }, []);

  const addProductToOrder = _order =>
    setOrder(__order => ({ ...__order, [_order._id]: _order }));
  const removeProductToOrder = _id => {
    setOrder(__order => {
      delete __order[_id];
      return { ...__order };
    });
  };
  const flush = () => {
    setOrder({});
    setTable(undefined);
  };

  return (
    <NavigationContext.Provider
      value={{ navigationConstant, setNavigationConstant }}>
      <OrderContext.Provider
        value={{
          order,
          addProductToOrder,
          removeProductToOrder,
          setOrder,
          table,
          setTable,
          flush,
        }}>
        <AuthContext.Provider value={{ userToken, setUserToken }}>
          <NavigationContainer theme={theme}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            {!isLoading && <RouterManager />}
          </NavigationContainer>
        </AuthContext.Provider>
      </OrderContext.Provider>
    </NavigationContext.Provider>
  );
};

export default App;
