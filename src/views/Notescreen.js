import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Label, Button, Input, DismissKeyboardHOC } from '../components';
import { Fonts } from '../stylesheets/constant';
import styles from '../stylesheets/views/Note';

import OrderContext from '../context/OrderContext';

const Notescreen = ({
  navigation,
  route: {
    params: { product },
  },
}) => {
  const { order, setOrder } = useContext(OrderContext);
  const insets = useSafeAreaInsets();
  const [note, setNote] = useState(order[product].note);

  const onChangeNotes = value =>
    setNote(value && value !== '' ? value : undefined);
  const onConfirmNote = () => {
    setOrder(_order => ({
      ..._order,
      [product]: { ..._order[product], note },
    }));
    navigation.goBack();
  };

  return (
    <DismissKeyboardHOC>
      <View style={styles.wrapper}>
        <View style={styles.noteWrapper}>
          <Label font={Fonts.FONT_SEMIBOLD} style={styles.title}>
            Aggiungi note
          </Label>
          <Input
            value={note}
            inputStyle={styles.note}
            placeholder="Inserisci le tue note"
            multiline
            onChange={onChangeNotes}
          />
        </View>
        <View style={{ ...styles.buttonWrapper, paddingBottom: insets.bottom }}>
          <Button
            value="Conferma"
            font={Fonts.FONT_SEMIBOLD}
            style={styles.button}
            onClick={onConfirmNote}
          />
        </View>
      </View>
    </DismissKeyboardHOC>
  );
};

export default Notescreen;
