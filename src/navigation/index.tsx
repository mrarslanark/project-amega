import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DashboardStack from './DashboardStack';
import MarketDataStack from './MarketDataStack';
import ProfileStack from './ProfileStack';
import {Routes} from '../constants';
import {createBottomBarIcon} from '../hoc';

const BottomTab = createBottomTabNavigator();

const Navigator: React.FC = (): React.JSX.Element => {
  return (
    <BottomTab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: 'red'}}>
      <BottomTab.Screen
        name={Routes.DashboardStack}
        component={DashboardStack}
        options={{
          title: 'Dashboard',
          tabBarIcon: createBottomBarIcon('dashboard'),
        }}
      />
      <BottomTab.Screen
        name={Routes.MarketDataStack}
        component={MarketDataStack}
        options={{
          title: 'Market Data',
          tabBarIcon: createBottomBarIcon('show-chart'),
        }}
      />
      <BottomTab.Screen
        name={Routes.ProfileStack}
        component={ProfileStack}
        options={{title: 'Profile', tabBarIcon: createBottomBarIcon('person')}}
      />
    </BottomTab.Navigator>
  );
};

export default Navigator;
