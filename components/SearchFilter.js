import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { domain } from '../dns';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function SearchFilter({ setShowSearchFilter }) {

    const dissolvenza = useRef(new Animated.Value(0)).current;

    const chiudiAnimazione = () => {
        Animated.timing(
            dissolvenza,
            {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }
        ).start(() => setShowSearchFilter(false));
    };

    useEffect(() => {
        Animated.timing(
            dissolvenza,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }
        ).start();
    }, []);

    return (
        <Animated.View style={{
            ...styles.container,
            opacity: dissolvenza,
        }}>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
                <Ionicons name="close-outline" size={30} color="black" onPress={chiudiAnimazione} />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, textAlign: 'center' }}>Categorie</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#ffe890', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Antipasti</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#ffe890', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Primi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#ffe890', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Secondi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#ffe890', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Dolci</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        width: '80%',
        height: '65%',
        backgroundColor: 'white',
        zIndex: 1,
        borderRadius: 10,
        top: '20%',
        left: '10%',
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
    },
})
