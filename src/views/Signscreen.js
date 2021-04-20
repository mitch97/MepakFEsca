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

  const handleUsername = value => setUsername(value);
  const handlePassword = value => setPassword(value);
  const handleSubmit = async () => {
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
            onChange={handleUsername}
          />
          <Input
            icon="password"
            placeholder="Inserisci la password"
            type="password"
            onChange={handlePassword}
          />
        </View>
        <View style={styles.submitWrapper}>
          <Button style={styles.submit} onClick={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default Signscreen;
