import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../stylesheets/views/Category';
import { ProductCard } from '../components';

import Api, { API_PATH, CATEGORIES_PATH } from '../api';

import NavigationContext, { Constants } from '../context/NavigationContext';
import AuthContext from '../context/AuthContext';

const Categoryscreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   console.log('--navigation.back, Categorscreen--', navigationConstant);
  //   switch (navigationConstant) {
  //     case Constants.RETURN_TO_HOME:
  //       navigation.goBack();
  //       break;
  //     default:
  //       break;
  //   }
  // }, [navigation, navigationConstant]);

  useEffect(() => {
    const effect = async () => {
      const categoriesFromServer = await Api.get(
        `${userToken}${API_PATH}${CATEGORIES_PATH}`,
      );
      setCategories(categoriesFromServer);
    };
    effect();
  }, []);

  const onSelectCategory = category =>
    navigation.navigate('Product', { category });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollview}
      alwaysBounceVertical={false}>
      <View style={styles.wrapper}>
        {categories.map(({ _id, guid, name, icon, products }) => (
          <View style={styles.cardWrapper} key={_id}>
            <ProductCard
              icon={icon}
              title={name}
              subtitle={`${products} prodotti`}
              onClick={() => onSelectCategory(guid)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Categoryscreen;
