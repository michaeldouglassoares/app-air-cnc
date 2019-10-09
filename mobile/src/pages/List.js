import React, { useState, useEffect } from 'react';

import logo from '../assets/logo.png'

import SpotList from '../components/SpotList';

import { SafeAreaView, AsyncStorage, Image, StyleSheet } from 'react-native';

export default function List() {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => { tech.trim() });
            setTechs(techsArray);

        });
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
    }
});