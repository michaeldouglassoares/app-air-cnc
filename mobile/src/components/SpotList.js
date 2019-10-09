import React, { useEffect } from 'react';

import api from '../services/api';

import { View, Text } from 'react-native';

export default function SpotList({ tech }) {

    useEffect(() => {

        async function loadSpots() {

            const data = await api.get('/spots', {
                params: { tech }
            });

            console.log(data);
        }

        loadSpots();
    }, [])



    return (
        <View>
            <Text>{tech}</Text>
        </View>
    )
}