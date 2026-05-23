import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
// Importacion de Pantallas
import WorkoutScreen from '../screens/WorkoutScreen';
import RoutineDetailScreen from '../screens/RoutineDetailScreen'; 
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

// Stack para pantalla Entrenamiento
function WorkoutStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutMain" component={WorkoutScreen} />
      <Stack.Screen name="RoutineDetail" component={RoutineDetailScreen} />
    </Stack.Navigator>
  );
}

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
        <Tab.Screen name="Entrenamiento" component={WorkoutStackNavigator} />
        <Tab.Screen name="Progreso" component={ProgressScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}