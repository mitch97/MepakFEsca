import { Platform } from 'react-native';

const FontFamilies = {
  FONT_LIGHT: 'Quicksand-Light',
  FONT_MEDIUM: 'Quicksand-Medium',
  FONT_REGULAR: 'Quicksand-Regular',
  FONT_SEMIBOLD: 'Quicksand-SemiBold',
};
const Fonts = {
  FONT_LIGHT: {
    fontFamily: FontFamilies.FONT_LIGHT,
    fontWeight: Platform.OS === 'ios' ? '300' : 'normal',
  },
  FONT_MEDIUM: {
    fontFamily: FontFamilies.FONT_MEDIUM,
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
  },
  FONT_REGULAR: {
    fontFamily: FontFamilies.FONT_REGULAR,
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },
  FONT_SEMIBOLD: {
    fontFamily: FontFamilies.FONT_SEMIBOLD,
    fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
  },
};
export default Fonts;
