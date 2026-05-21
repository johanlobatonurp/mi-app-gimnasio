import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import * as Sentry from '@sentry/react-native';

import { MIS_RUTINAS } from '../database/mockData';
import RoutineCard from '../components/RoutineCard';

export default function WorkoutScreen() {

useEffect(() => {
    const span = Sentry.startInactiveSpan({ 
      name: "Cargar Pantalla Entrenamientos",
      op: "ui.load" 
    });
    
    setTimeout(() => {
      if (span) {
        span.end();
      } 
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      
      <Text style={styles.sectionTitle}>Rutinas</Text>


      <View style={styles.buttonsRow}>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            if (Sentry.metrics) {
              Sentry.metrics.count("button_clicks", 1, { tags: { button: "crear_rutina_btn" } });
            }
          }}
        >
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.background} />
          <Text style={styles.primaryButtonText}>Crear Rutina{"\n"}Personalizada</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <MaterialCommunityIcons name="search-web" size={24} color={COLORS.background} />
          <Text style={styles.secondaryButtonText}>Explorar{"\n"}Rutinas</Text>
        </TouchableOpacity>

      </View>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Mis Rutinas</Text>

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
    fontWeight: '900', 
    fontStyle: 'italic', 
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, 
  },
  
  primaryButton: {
    flex: 1, 
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: SIZES.radius,
    gap: 8, 
  },
  primaryButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },

  secondaryButton: {
    flex: 1, 
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