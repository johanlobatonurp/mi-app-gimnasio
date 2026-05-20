import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

import { MIS_RUTINAS } from '../database/mockData';
import RoutineCard from '../components/RoutineCard';

export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      
      {/* Título de la sección */}
      <Text style={styles.sectionTitle}>Rutinas</Text>

      {/* Contenedor de los dos botones */}
      <View style={styles.buttonsRow}>
        
        {/* Botón Principal (Crear Rutina) */}
        <TouchableOpacity style={styles.primaryButton}>
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.background} />
          <Text style={styles.primaryButtonText}>Crear Rutina{"\n"}Personalizada</Text>
        </TouchableOpacity>

        {/* Botón Secundario (Explorar) */}
        <TouchableOpacity style={styles.secondaryButton}>
          <MaterialCommunityIcons name="search-web" size={24} color={COLORS.background} />
          <Text style={styles.secondaryButtonText}>Explorar{"\n"}Rutinas</Text>
        </TouchableOpacity>

      </View>

      {/* 2. Nuevo Título para la sección de abajo */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Mis Rutinas</Text>

      {/* 3. FlatList para renderizar las tarjetas dinámicamente */}
      <FlatList
        data={MIS_RUTINAS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoutineCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '900', // Letra bien gruesa como en tu diseño
    fontStyle: 'italic', // Tu título tiene una ligera inclinación
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // Espacio entre los botones
  },
  /* Estilos del Botón Amarillo */
  primaryButton: {
    flex: 1, // Para que ocupe la mitad del espacio
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: SIZES.radius,
    gap: 8, // Espacio entre el icono y el texto
  },
  primaryButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
  /* Estilos del Botón con Borde */
  secondaryButton: {
    flex: 1, // Para que ocupe la otra mitad
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: SIZES.radius,
    gap: 8,
  },
  secondaryButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
});