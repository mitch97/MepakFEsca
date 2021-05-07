import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import { ProductRow, Separator } from '../components';

import OrderContext from '../context/OrderContext';

import Api, { BASE_URL, API_PATH, PRODUCTS_BY_CATEGORY_PATH } from '../api';

const Productscreen = ({
  navigation,
  route: {
    params: { category },
  },
}) => {
  const {
    order,
    addProductToOrder,
    removeProductToOrder,
    setOrder,
  } = useContext(OrderContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const effect = async () => {
      const productsFromServer = await Api.get(
        `${BASE_URL}${API_PATH}${PRODUCTS_BY_CATEGORY_PATH(category)}`,
      );
      setProducts(productsFromServer);
    };
    effect();
  }, [category, setProducts]);

  const renderItem = ({ item: { name, description, price, _id } }) => {
    return (
      <ProductRow
        title={name}
        subtitle={description}
        price={price}
        quantity={order[_id]?.quantity}
        segue={order[_id]?.segue}
        onSelect={() => onSelectProduct({ key: _id })}
        onChangeQuantity={({ sign }) =>
          onChangeQuantityProduct({ key: _id, sign })
        }
        onAddSegue={() => onSegue({ key: _id })}
        onAddNote={() => navigation.push('Note', { product: _id })}
      />
    );
  };
  const keyExtractor = item => item._id;

  const onSelectProduct = ({ key }) => {
    const productToAdd = products.find(({ _id }) => _id === key);
    const quantity = order[key]?.quantity;

    if (quantity && quantity > 0) removeProductToOrder(key);
    else addProductToOrder({ ...productToAdd, quantity: 1 });
  };

  const onChangeQuantityProduct = ({ key, sign }) => {
    const quantity = order[key]?.quantity;

    if (sign === '-') {
      if (quantity === 1) {
        removeProductToOrder(key);
      } else {
        setOrder(_order => ({
          ..._order,
          [key]: { ..._order[key], quantity: _order[key].quantity - 1 },
        }));
      }
    } else if (sign === '+') {
      setOrder(_order => ({
        ..._order,
        [key]: { ..._order[key], quantity: _order[key].quantity + 1 },
      }));
    }
  };

  const onSegue = ({ key }) => {
    setOrder(_order => ({
      ..._order,
      [key]: {
        ..._order[key],
        segue: _order[key].segue ? !_order[key].segue : true,
      },
    }));
  };

  return (
    <>
      <FlatList
        data={products}
        extraData={order}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
      />
    </>
  );
};

export default Productscreen;
