import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DashboardStack from './DashboardStack';
import MarketDataStack from './MarketDataStack';
import ProfileStack from './ProfileStack';

const BottomTab = createBottomTabNavigator();

const Navigator: React.FC = (): React.JSX.Element => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{title: 'Dashboard'}}
      />
      <BottomTab.Screen
        name="MarketDataStack"
        component={MarketDataStack}
        options={{title: 'Market Data'}}
      />
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </BottomTab.Navigator>
  );
};

export default Navigator;
