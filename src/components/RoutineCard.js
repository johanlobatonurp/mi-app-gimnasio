import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function RoutineCard({ item }) {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
      
      {/* Fila superior: Etiqueta ACTUAL y el icono de fuego */}
      <View style={styles.cardHeader}>
        {item.isActual ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ACTUAL</Text>
          </View>
        ) : (
          <View /> // Espacio vacío si no es la rutina actual
        )}
      </View>

      {/* Contenido de la rutina */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.surface, // El fondo gris oscuro
    borderRadius: SIZES.radius,
    padding: 20,
    marginBottom: 16, // Espacio entre tarjetas
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20, // Para que parezca una píldora
  },
  badgeText: {
    color: COLORS.background, // Texto negro
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 20,
  },
});