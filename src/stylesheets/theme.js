import { DefaultTheme } from '@react-navigation/native';
import { Constants } from './constant';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Constants.GENERIC_BACKGROUND,
  },
};
export default theme;
