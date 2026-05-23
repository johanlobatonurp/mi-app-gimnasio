import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import * as Sentry from '@sentry/react-native';
import { MIS_RUTINAS } from '../database/mockData';
import RoutineCard from '../components/RoutineCard';


export default function WorkoutScreen({navigation}) {

// Ejemplo de rutina inicial
  const [rutinas, setRutinas] = useState([
    { id: '1', title: 'Full Body Split', description: '4 veces a la semana' }
  ]);

  // Estados de formulario para agregar rutina
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescription] = useState('');

  //Estados para menu de opciones
  const [opcionesVisible, setOpcionesVisible] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);

  // Guardar rutina
  const guardarRutina = () => {
    if (nuevoNombre.trim() === '') return; // No dejar crear si el nombre está vacío

    const nueva = {
      id: Date.now().toString(), // Genera un ID único basado en el tiempo
      title: nuevoNombre,
      description: nuevaDescripcion || 'Sin descripción',
    };

    setRutinas([...rutinas, nueva]); // Agrega la nueva rutina al arreglo actual
    
    setNuevoNombre('');
    setNuevaDescription('');
    setModalVisible(false);
  };

  // Función para abrir menú de opciones
  const abrirOpciones = (rutina) => {
    setRutinaSeleccionada(rutina);
    setOpcionesVisible(true);
  };

  // Función para eliminar 
  const confirmarEliminacion = () => {
    Alert.alert(
      "Eliminar Rutina",
      `¿Estás seguro de que deseas eliminar "${rutinaSeleccionada?.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            setRutinas(rutinas.filter(r => r.id !== rutinaSeleccionada.id));
            setOpcionesVisible(false);
          } 
        }
      ]
    );
  };


 //Empieza sentry
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
//Termina sentry


  return (
    <View style={styles.container}>
      
      <Text style={styles.sectionTitle}>Agregar Rutinas</Text>

      <View style={styles.buttonsRow}>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            //Muestra cuadro para crear rutina
            setModalVisible(true);
            // Metrica del sentry
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
          <Text style={styles.secondaryButtonText} >Explorar Rutinas</Text>
        </TouchableOpacity>

{/* Cuadro para agregar rutina */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Crear Rutina de Entrenamiento</Text>

            <Text style={styles.inputLabel}>Nombre de la rutina</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Push Pull Legs"
              placeholderTextColor="#666"
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
            />

            <Text style={styles.inputLabel}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ej: 6 veces a la semana"
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={3}
              value={nuevaDescripcion}
              onChangeText={setNuevaDescription}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={guardarRutina}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      </View>

      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Mis Rutinas</Text>

{/* Lista de rutinas */}
<FlatList
        style={{ flex: 1, marginTop: 10 }}
        data={rutinas}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.routineCard}
            onPress={() => navigation.navigate('RoutineDetail', { rutina: item })}
          >
            <View style={styles.routineInfo}>
              <Text style={styles.routineTitle}>{item.title}</Text>
              <Text style={styles.routineDescription}>{item.description}</Text>
            </View>

            <TouchableOpacity 
              style={styles.optionsButton}
              onPress={() => abrirOpciones(item)}
            >
              <MaterialCommunityIcons name="dots-vertical" size={24} color="#AAA" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
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
    justifyContent: 'left',
    padding: 12,
    borderRadius: SIZES.radius,
    gap: 8,
  },
  secondaryButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },

  //MODAL 
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
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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

  routineCard: {
    backgroundColor: '#1E1E1E', 
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row', // Obliga a info y puntos a ponerse lado a lado
    alignItems: 'center', // Alinea verticalmente los puntos con el centro del texto
    justifyContent: 'space-between', // Empuja el icono al extremo derecho
  },
  routineInfo: {
    flex: 1,
  },
  routineTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routineDescription: {
    color: '#AAA', 
    fontSize: 14,
  },

});