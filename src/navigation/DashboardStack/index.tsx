import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Routes} from '../../constants';
import Dashboard from '../../screens/Dashboard';
import Detail from '../../screens/Detail';
import {DashboardStackParamList} from './types';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardStack: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Routes.Dashboard}>
      <Stack.Screen
        name={Routes.Dashboard}
        component={Dashboard}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen
        name={Routes.Detail}
        component={Detail}
        options={{title: 'Detail'}}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;
