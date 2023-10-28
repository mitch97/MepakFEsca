import React, { useState, useContext } from 'react';
import { Platform, View } from 'react-native';
import styles from '../stylesheets/views/Sign';

import { Input, Button } from '../components';

import AuthContext from '../context/AuthContext';

const Signscreen = ({ navigation }) => {
  const { setUserToken } = useContext(AuthContext);
  const [username, setUsername] = useState();

  const onChangeUsername = value => setUsername(value);

  const onSubmit = async () => {
    setUserToken(`http://${username}:3333`);
    navigation.navigate(Platform.isPad ? 'GroupedOrder' : 'Table');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.loginWrapper}>
        <View style={styles.formWrapper}>
          <Input
            icon="user"
            style={styles.username}
            placeholder="Inserisci l'indirizzo IP del server"
            onChange={onChangeUsername}
          />
        </View>
        <View style={styles.submitWrapper}>
          <Button onClick={onSubmit} value="Conferma" />
        </View>
      </View>
    </View>
  );
};

export default Signscreen;
