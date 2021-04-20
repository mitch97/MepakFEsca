import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import useAuth from './src/hooks/useAuth';
import theme from './src/stylesheets/theme';

import Api, { BASE_URL, CONFIG_PATH } from './src/api';

import Store from './src/store';

import SplashScreenManager from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RouterManager from './src/router/RouterManager';
import AuthContext from './src/context/AuthContext';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState();

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

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      <NavigationContainer theme={theme}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        {!isLoading && <RouterManager />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
