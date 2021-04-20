import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from '../components';
import { Constants, Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/components/Input';

const Input = ({
  value,
  placeholder = 'Placeholder here',
  type = 'default',
  icon,
  font = Fonts.FONT_REGULAR,
  onChange = () => {},
  style: customStyle,
}) => {
  const otherProps = {
    secureTextEntry: type === 'password',
  };
  return (
    <View style={{ ...styles.wrapper, ...customStyle }}>
      <TextInput
        style={{ ...styles.input, ...font }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Constants.INPUT_PLACEHOLDER_COLOR}
        keyboardType={type === 'password' ? 'default' : type}
        onChangeText={onChange}
        autoCapitalize="none"
        {...otherProps}
      />
      {icon && (
        <View style={styles.iconWrapper}>
          <Icon
            name={icon}
            size={Constants.ICON_SIZE_SMALL}
            color={Constants.INPUT_PLACEHOLDER_COLOR}
          />
        </View>
      )}
    </View>
  );
};

export default Input;
