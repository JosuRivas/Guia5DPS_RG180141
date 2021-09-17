import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';
import colors from '../utils/Colors';
import RNPickerSelect from 'react-native-picker-select';


const Formulario = ({reservas, setReservas, guardarMostrarForm, guardarReservasStorage})=>{
    const [nombre, guardarNombre] = useState('');
    const [numPersonas, guardarPersonas] = useState('');
    const [zona, guardarZona] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () =>{
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () =>{
        setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
        const opciones = {hour:'numeric', month:'long',day:"2-digit"};
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora =>{
        const opciones = {hour: 'numeric', minute: "2-digit", hour12:false};
        guardarHora(hora.toLocaleString('es-ES',opciones));
        hideTimePicker();
    };

    const crearNuevaReserva = () => {
        if (nombre.trim() === '' ||
        numPersonas.trim() === '' ||
        zona.trim() === '' ||
        fecha.trim() === '' ||
        hora.trim() === '' ) {
            mostrarAlerta();
            return;
        }

        const reserva = { nombre, numPersonas, zona, fecha, hora};
        reserva.id = shortid.generate();

        const reservasNuevo = [...reservas, reserva];
        setReservas(reservasNuevo);
        // Pasar las nuevas citas a storage
        guardarReservasStorage(JSON.stringify(reservasNuevo));
        // Ocultar el formulario
        guardarMostrarForm(false);
        // Resetear el formulario
        guardarNombre('');
        guardarZona('');
        guardarPersonas('');
        guardarHora('');
        guardarFecha('');
    }

    const mostrarAlerta = () => {
        Alert.alert(
        'Error', // Titulo
        'Todos los campos son obligatorios', // mensaje
        [{
        text: 'OK' // Arreglo de botones
        }]
        )
    }
    return (
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                style={styles.input}
                onChangeText={ texto => guardarNombre(texto) }
                />
            </View>
            <View>
                <Text style={styles.label}>Numero de personas:</Text>
                <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={ texto => guardarPersonas(texto) }
                />
            </View>
            <View>
                <Text style={styles.label}>Zona del restaurante:</Text>
                <RNPickerSelect
                    onValueChange={texto => guardarZona(texto)}
                    items={[
                        { label: 'Fumadores', value: 'Fumadores' },
                        { label: 'No fumadores', value: 'No fumadores' },
                    ]}
                />
            </View>
            <View>
                <Text style={styles.label}>Fecha de la reserva:</Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale='es_ES'
                headerTextIOS="Elige la fecha"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
                />
                <Text>{fecha}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora de la reserva:</Text>
                <Button title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale='es_ES'
                headerTextIOS="Elige una Hora"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
                />
                <Text>{hora}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={ () => crearNuevaReserva() }
                style={styles.btnSubmit}>
                <Text style={styles.textoSubmit}>Reservar</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        </>
        );
}

const styles = StyleSheet.create({
    formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
    },
    label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
    },
    input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
    },
    btnSubmit: {
    padding: 10,
    backgroundColor:colors.BUTTON_COLOR,
    marginVertical: 10
    },
    textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
    }
    })
    export default Formulario;