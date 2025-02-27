import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your pages
import { DartsListPage } from './components/DartsListPage';
import { DartsSinglePage } from './components/DartsSinglePage';
import { DartsCreatePage } from './components/DartsCreatePage';
import { DartsModPage } from './components/DartsModPage';
import { DartsDelPage } from './components/DartsDelPage';
import WebViewScreen from './components/WebViewScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="DartsListPage">
      <Stack.Screen
        name="DartsListPage"
        component={DartsListPage}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen
        name="DartsSingle"
        component={DartsSinglePage}
        options={{ title: 'Dartsozó Részletek' }}
      />
      <Stack.Screen
        name="DartsCreate"
        component={DartsCreatePage}
        options={{ title: 'Új dartsozó' }}
      />
      <Stack.Screen
        name="DartsMod"
        component={DartsModPage}
        options={{ title: 'Dartsozó Módosítása' }}
      />
      <Stack.Screen
        name="DartsDel"
        component={DartsDelPage}
        options={{ title: 'Dartsozó Törlése' }}
      />
    </Stack.Navigator>
  );
}
export default App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DartsListPage">
        <Drawer.Screen
          name="DartsListPage"
          component={StackNavigator}
          options={{ title: 'Dartsozók' }}
        />
        <Drawer.Screen
          name="DartsCreate"
          component={DartsCreatePage}
          options={{ title: 'Új Dartsozó' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
