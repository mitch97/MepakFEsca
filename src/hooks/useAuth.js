import Api from '../api';
import { BASE_URL, LOGOUT_PATH } from '../api/constant';

import Store from '../store';

const useAuth = () => {
  const signIn = async ({ username, password }) => {
    try {
      // const response = await Api.post(`${BASE_URL}${LOGIN_PATH}`, {
      //   username,
      //   password,
      // });
      const response = { _id: '1', token: 'abc', user: 'abc123' };
      if (response) {
        const { _id: id, token, user } = response;
        Store.insert('Token', { id, token, user });

        return { response: true, token };
      }
      return { response: false };
    } catch (error) {
      return { response: false };
    }
  };

  const signOut = async () => {
    try {
      const token = Store.findFirst('Token');
      await Api.post(`${BASE_URL}${LOGOUT_PATH}`, {
        token,
      });
    } catch (error) {
    } finally {
      Store.remove('Token');
    }
  };

  return { signIn, signOut };
};

export default useAuth;
