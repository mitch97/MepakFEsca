import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../stylesheets/views/Category';
import { Card } from '../components';

import Api, { BASE_URL, API_PATH, CATEGORIES_PATH } from '../api';

const Categoryscreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const effect = async () => {
      const categoriesFromServer = await Api.get(
        `${BASE_URL}${API_PATH}${CATEGORIES_PATH}`,
      );
      setCategories(categoriesFromServer);
    };
    effect();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollview}
      alwaysBounceVertical={false}>
      <View style={styles.wrapper}>
        {categories.map(({ _id, name, icon, products }) => (
          <View style={styles.cardWrapper} key={_id}>
            <Card icon={icon} title={name} subtitle={`${products} prodotti`} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Categoryscreen;
