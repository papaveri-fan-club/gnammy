import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { domain } from '../dns';
import { useState } from 'react';
import axios from 'axios';

export default function SearchFilter({ setShowSearchFilter }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
                <Ionicons name="close-outline" size={30} color="black" onPress={() => setShowSearchFilter(false)} />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30, textAlign: 'center' }}>Categorie</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#FFEFAF', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Antipasti</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#FFEFAF', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Primi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#FFEFAF', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Secondi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#FFEFAF', borderRadius: 10, padding: 10, marginRight: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Dolci</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        padding: 20,
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
