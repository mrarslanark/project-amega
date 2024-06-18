import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DashboardStack from './DashboardStack';
import MarketDataStack from './MarketDataStack';
import ProfileStack from './ProfileStack';
import {Routes} from '../constants';

const BottomTab = createBottomTabNavigator();

const Navigator: React.FC = (): React.JSX.Element => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name={Routes.DashboardStack}
        component={DashboardStack}
        options={{title: 'Dashboard'}}
      />
      <BottomTab.Screen
        name={Routes.MarketDataStack}
        component={MarketDataStack}
        options={{title: 'Market Data'}}
      />
      <BottomTab.Screen
        name={Routes.ProfileStack}
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </BottomTab.Navigator>
  );
};

export default Navigator;
