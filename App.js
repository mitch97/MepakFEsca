import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import styles from './src/stylesheets/App';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';

import SplashScreenManager from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

import Loading from './src/components/loading/Loading';

const App = () => {
  useEffect(() => {
    SplashScreenManager.hide();

    const effect = async () => {};
    effect();
  }, []);

  return (
    <NavigationContainer>
      {Platform.OS === 'ios' && <StatusBar />}
      <View style={styles.appContainer}>
        <Loading />
      </View>
    </NavigationContainer>
  );
};

export default App;
