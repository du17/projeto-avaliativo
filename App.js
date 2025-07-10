import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ResumoScreen from './screens/ResumoScreen';
import NovoGastoScreen from './screens/NovoGastoScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PerfilScreen from './screens/PerfilScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Resumo':
                  iconName = 'stats-chart';
                  break;
                case 'Novo Gasto':
                  iconName = 'add-circle';
                  break;
                case 'Histórico':
                  iconName = 'list';
                  break;
                case 'Perfil':
                  iconName = 'person';
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: '#999',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Resumo" component={ResumoScreen} />
          <Tab.Screen name="Novo Gasto" component={NovoGastoScreen} />
          <Tab.Screen name="Histórico" component={HistoricoScreen} />
          <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
