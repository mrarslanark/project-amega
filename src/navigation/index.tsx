import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import DashboardStack from './Dashboard';

const BottomTab = createBottomTabNavigator();

const Navigator: React.FC = (): React.JSX.Element => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{title: 'Dashboard'}}
      />
    </BottomTab.Navigator>
  );
};

export default Navigator;
