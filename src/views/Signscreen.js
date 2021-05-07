import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import useAuth from '../hooks/useAuth';
import styles from '../stylesheets/views/Sign';

import { Input, Button } from '../components';

import AuthContext from '../context/AuthContext';

const Signscreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const { setUserToken } = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onChangeUsername = value => setUsername(value);
  const onChangePassword = value => setPassword(value);
  const onSubmit = async () => {
    const { response, token } = await signIn({ username, password });
    if (response) {
      setUserToken(token);
      navigation.navigate('Category');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.loginWrapper}>
        <View style={styles.formWrapper}>
          <Input
            icon="user"
            style={styles.username}
            placeholder="Inserisci la username"
            type="email-address"
            onChange={onChangeUsername}
          />
          <Input
            icon="password"
            placeholder="Inserisci la password"
            type="password"
            onChange={onChangePassword}
          />
        </View>
        <View style={styles.submitWrapper}>
          <Button style={styles.submit} onClick={onSubmit} />
        </View>
      </View>
    </View>
  );
};

export default Signscreen;
