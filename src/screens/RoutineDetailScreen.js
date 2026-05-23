import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';

export default function RoutineDetailScreen({ route, navigation }) {
  const { rutina } = route.params;

  // Estados 
  const [workouts, setWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');

  // Guardar dia de entrenamiento
  const guardarWorkout = () => {
    if (nuevoNombre.trim() === '') return;

    if (workouts.length >= 6) {
      Alert.alert("Límite alcanzado", "No puedes agregar más de 6 días de entrenamiento por rutina.");
      return;
    }

    const nuevoWorkout = {
      id: Date.now().toString(),
      name: nuevoNombre,
    };

    setWorkouts([...workouts, nuevoWorkout]);
    setNuevoNombre('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Boton para regresar y cantidad de entrenamientos */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>{rutina.title}</Text>
      <Text style={styles.subtitle}>
        Entrenamientos ({workouts.length}/6)
      </Text>

      {/* Lista */}
      <FlatList
        style={styles.list}
        data={workouts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.workoutButtonText}>{item.name}</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aún no has agregado ningún día de entrenamiento.</Text>
        }
      />

      {/* Boton para agregar entrenamiento */}
      {workouts.length < 6 && (
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ AGREGAR ENTRENAMIENTO</Text>
        </TouchableOpacity>
      )}

      {/* Formulario para crear entrenamiento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nuevo Entrenamiento</Text>

            <Text style={styles.inputLabel}>Nombre del entrenamiento</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Pull - Dia 1"
              placeholderTextColor="#666"
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              autoFocus={true}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => {
                  setModalVisible(false);
                  setNuevoNombre('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={guardarWorkout}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: '#FF8C00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  workoutButton: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  workoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  arrowIcon: {
    color: '#FF8C00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    color: '#FF8C00',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF8C00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});