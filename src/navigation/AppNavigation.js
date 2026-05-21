import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // <-- Importamos los iconos

import WorkoutScreen from '../screens/WorkoutScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { 
            backgroundColor: '#1E1E1E', 
            shadowColor: 'transparent', 
            elevation: 0 
          },
          headerTitleAlign: 'center',   
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          
          
          tabBarStyle: { backgroundColor: '#1E1E1E', borderTopWidth: 0 },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          
          
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Entrenamiento') iconName = 'dumbbell';
            else if (route.name === 'Progreso') iconName = 'chart-line';
            else if (route.name === 'Perfil') iconName = 'account';
            
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Entrenamiento" component={WorkoutScreen} />
        <Tab.Screen name="Progreso" component={ProgressScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}