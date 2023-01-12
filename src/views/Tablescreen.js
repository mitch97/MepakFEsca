import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import styles from '../stylesheets/views/Table';
import usePolling from '../hooks/usePolling';
import { TableCard, Label } from '../components';
import { ucfirst } from '../utils/String';

import Api, { BASE_URL, API_PATH, TABLES_PATH } from '../api';

import OrderContext from '../context/OrderContext';
import NavigationContext, { Constants } from '../context/NavigationContext';

const Scene = ({ tables, onSelect }) => (
  <ScrollView
    contentContainerStyle={styles.scrollview}
    alwaysBounceVertical={false}>
    <View style={styles.wrapperScene}>
      {tables.map(({ sites, code, order: { status } = {}, order }) => (
        <View style={styles.cardWrapper} key={code}>
          <TableCard
            status={status}
            title={code}
            subtitle={`${sites} posti`}
            onClick={() => onSelect({ sites, code, order })}
          />
        </View>
      ))}
    </View>
  </ScrollView>
);

const Tablescreen = ({ navigation }) => {
  const { setTable } = useContext(OrderContext);
  const { navigationConstant, setNavigationConstant } = useContext(
    NavigationContext,
  );
  const [tables, setTables] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState();
  const [isPolling, startPolling, stopPolling] = usePolling({
    interval: 5000,
    onTick: () => downloadTables(),
  });

  useEffect(() => {
    switch (navigationConstant) {
      case Constants.RETURN_TO_HOME:
        setNavigationConstant(undefined);
        downloadTables();
        break;
      default:
        break;
    }
  }, [setNavigationConstant, navigationConstant]);

  useEffect(() => {
    downloadTables();
  }, []);

  // useEffect(() => {
  //   if (!isPolling) startPolling();
  // });

  const downloadTables = async () => {
    console.log('--downloadTables--');
    const tablesFromServer = await Api.get(
      `${BASE_URL}${API_PATH}${TABLES_PATH}`,
    );
    setTables(tablesFromServer);
    setTabs(
      tablesFromServer.map(({ room }) => ({
        key: room,
        title: ucfirst(room),
      })),
    );
  };

  const onSelectTable = ({ code, order }) => {
    // stopPolling();
    if (!order) {
      setTable(code);
      navigation.navigate('Category');
    } else navigation.navigate('OrderDetail', { order: order._id });
  };

  const renderScene = ({ route, jumpTo }) => {
    return (
      <Scene
        key={route.key}
        tables={tables.find(({ room }) => room === route.key).table}
        jumpTo={jumpTo}
        onSelect={onSelectTable}
      />
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabbarIndicator}
      style={styles.tabbarWrapper}
      renderLabel={renderLabel}
      tabStyle={styles.tabbarStyle}
    />
  );

  const renderLabel = ({ route, focused, color }) => (
    <Label style={{ ...styles.tabbarLabel, opacity: !focused ? 0.3 : 1 }}>
      {route.title}
    </Label>
  );

  return (
    <View style={styles.wrapper}>
      {tables && tabs && (
        <TabView
          navigationState={{ index: tabIndex, routes: tabs }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setTabIndex}
        />
      )}
    </View>
  );
};

export default Tablescreen;
