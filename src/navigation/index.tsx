import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Routes} from '../constants';
import {createBottomBarIcon} from '../hoc';
import {isIOS} from '../utils';
import DashboardStack from './DashboardStack';
import MarketDataStack from './MarketDataStack';
import ProfileStack from './ProfileStack';

const BottomTab = createBottomTabNavigator();

const Navigator: React.FC = (): React.JSX.Element => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#086375',
        tabBarStyle: {
          minHeight: isIOS ? 100 : 80,
        },
        tabBarItemStyle: {
          paddingBottom: 12,
        },
      }}>
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
