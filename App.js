import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react';
import { Platform, StatusBar } from 'react-native';
import theme from './src/stylesheets/theme';

import Api from './src/api';
import {
  BASE_URL,
  CONFIG_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
} from './src/api/constant';

import Store from './src/store';

import SplashScreenManager from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RouterManager from './src/router/RouterManager';
import AuthContext from './src/context/AuthContext';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreenManager.hide();

    const effect = async () => {
      Store.remove('Config', 'key = "appVersion"');
      const config = await Api.get(`${BASE_URL}${CONFIG_PATH}`);
      Store.insertMany(
        'Config',
        Object.keys(config)
          .filter(key => key !== 'appVersion')
          .map(key => ({ key, value: `${config[key]}` })),
      );

      const appVersion = Store.find('Config', 'key = "appVersion"');
      if (appVersion && appVersion.length) {
        if (parseInt(appVersion[0], 10) < config.appVersion) {
          //TODO: Mostra un dialog se serve un aggiornamento
          Store.update('Config', 'key = "appVersion"', {
            key: 'appVersion',
            value: `${config.appVersion}`,
          });
        }
      } else {
        Store.insert('Config', {
          key: 'appVersion',
          value: `${config.appVersion}`,
        });
      }

      setLoading(false);
    };
    effect();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async ({ username, password }) => {
        try {
          // const response = await Api.post(`${BASE_URL}${LOGIN_PATH}`, {
          //   username,
          //   password,
          // });
          const response = { _id: '1', token: 'abc', user: 'abc123' };
          if (response) {
            const { _id: id, token, user } = response;
            Store.insert('Token', { id, token, user });

            return { response: true };
          }
          return { response: false };
        } catch (error) {
          return { response: false, error };
        }
      },
      signOut: async () => {
        try {
          const token = Store.findFirst('Token');
          await Api.post(`${BASE_URL}${LOGOUT_PATH}`, {
            token,
          });
        } catch (error) {
        } finally {
          Store.remove('Token');
        }
      },
      getToken: () => Store.findFirst('Token'),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        {!isLoading && <RouterManager />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
