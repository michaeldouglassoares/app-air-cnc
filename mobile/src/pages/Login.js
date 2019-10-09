import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { View, StyleSheet, Text, Image, TouchableOpacity, AsyncStorage, TextInput, Platform, KeyboardAvoidingView } from 'react-native';

import logo from '../assets/logo.png'

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        });
    }, [])


    async function handleSubmit() {

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios' || Platform.OS === 'android'} style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999">
                </TextInput>

                <Text style={styles.label}>SUAS TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    value={techs}
                    onChangeText={setTechs}
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999">
                </TextInput>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f05a5b',
        borderRadius: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})