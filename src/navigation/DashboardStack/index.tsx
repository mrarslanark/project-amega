import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Dashboard from '../../screens/Dashboard';
import Detail from '../../screens/Detail';
import {DashboardStackParamList} from './types';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardStack: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Project AMEGA'}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{title: 'Detail'}}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;
